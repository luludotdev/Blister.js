import fileType from 'file-type'
import { parseKey } from './beatsaverKey'
import { b64ToBuffer } from './binary'
import {
  ERR_INVALID_BEATSAVER_KEY,
  ERR_INVALID_COVER_FILE_TYPE,
  ERR_INVALID_LEGACY_COVER_IMAGE,
  ERR_INVALID_MAP_HASH,
  ERR_UNKNOWN_LEGACY_MAP,
} from './errors'
import { ILegacyBeatmap, ILegacyPlaylist } from './legacy'
import {
  BeatmapType,
  IBeatmap,
  ICommonBeatmap,
  IHashBeatmap,
  IKeyBeatmap,
  ILevelIDBeatmap,
  IPlaylist,
} from './spec'
import { createHashBeatmap, createKeyBeatmap } from './types'

interface IConvertOptions {
  ignoreInvalidKeys: boolean
  ignoreInvalidHashes: boolean
  ignoreInvalidCover: boolean
}

/**
 * Convert legacy (v1) Playlists to v2 Format
 * @param legacy Legacy playlist object
 */
export const convertLegacyPlaylist: (
  legacy: ILegacyPlaylist,
  options?: IConvertOptions
) => IPlaylist = (legacy, options) => {
  const playlist: IPlaylist = {
    author: legacy.playlistAuthor,
    description: legacy.playlistDescription || null,
    title: legacy.playlistTitle,

    cover: null,
    maps: [],
  }

  const ignoreInvalidCover = options?.ignoreInvalidCover ?? true
  if (ignoreInvalidCover === false) {
    if (legacy.image === null || legacy.image === undefined) {
      throw ERR_INVALID_LEGACY_COVER_IMAGE
    }
  }

  if (legacy.image) {
    try {
      const cover = b64ToBuffer(legacy.image)
      const type = fileType(cover)?.mime
      if (type !== 'image/png' && type !== 'image/jpeg') {
        throw ERR_INVALID_COVER_FILE_TYPE
      }

      playlist.cover = cover
    } catch {
      throw ERR_INVALID_LEGACY_COVER_IMAGE
    }
  }

  for (const song of legacy.songs) {
    const map = convertLegacySong(song)
    if (map !== null) playlist.maps.push(map)
  }

  return playlist
}

const sha1RX = /^[0-9a-f]{40}$/

const convertLegacySong: (
  song: ILegacyBeatmap,
  options?: IConvertOptions
) => IBeatmap | null = (song, options) => {
  const ignoreInvalidKeys = options?.ignoreInvalidKeys ?? false
  const ignoreInvalidHashes = options?.ignoreInvalidHashes ?? false

  const common: ICommonBeatmap = {
    dateAdded: song.dateAdded ? new Date(song.dateAdded) : new Date(),
  }

  if (song.hash) {
    const hash = song.hash.toLowerCase()
    const validSha1 = sha1RX.test(hash)
    if (validSha1 === false) {
      if (ignoreInvalidHashes) return null
      else throw ERR_INVALID_MAP_HASH(song.hash)
    }

    const map: IHashBeatmap = createHashBeatmap(Buffer.from(hash, 'hex'))
    return { ...common, ...map }
  }

  if (song.key) {
    const key = parseKey(song.key)
    if (key === false) {
      if (ignoreInvalidKeys) return null
      else throw ERR_INVALID_BEATSAVER_KEY(song.key)
    }

    const map: IKeyBeatmap = createKeyBeatmap(parseInt(key, 16))
    return { ...common, ...map }
  }

  if (song.levelId) {
    const map: ILevelIDBeatmap = {
      levelID: song.levelId,
      type: BeatmapType.LevelID,
    }

    return { ...common, ...map }
  }

  throw ERR_UNKNOWN_LEGACY_MAP
}
