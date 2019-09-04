import { parseKey } from './beatsaverKey'
import { b64ToBuffer } from './binary'
import { ERR_INVALID_BEATSAVER_KEY, ERR_UNKNOWN_LEGACY_MAP } from './errors'
import { ILegacyBeatmap, ILegacyPlaylist } from './legacy'
import {
  IBeatmap,
  ICommonBeatmap,
  IHashBeatmap,
  IKeyBeatmap,
  IPlaylist,
} from './spec'

export const convertLegacyPlaylist: (
  legacy: ILegacyPlaylist
) => IPlaylist = legacy => {
  const playlist: IPlaylist = {
    author: legacy.playlistAuthor,
    description: legacy.playlistDescription || null,
    title: legacy.playlistTitle,

    cover: b64ToBuffer(legacy.image),
    maps: [],
  }

  for (const song of legacy.songs) {
    playlist.maps = [...playlist.maps, convertLegacySong(song)]
  }

  return playlist
}

const convertLegacySong: (song: ILegacyBeatmap) => IBeatmap = song => {
  const common: ICommonBeatmap = {
    dateAdded: song.dateAdded ? new Date(song.dateAdded) : new Date(),
  }

  if (song.hash) {
    const map: IHashBeatmap = {
      hash: song.hash.toLowerCase(),
      type: 'hash',
    }

    return { ...common, ...map }
  }

  if (song.key) {
    const key = parseKey(song.key)
    if (!key) throw ERR_INVALID_BEATSAVER_KEY(song.key)

    const map: IKeyBeatmap = {
      key,
      type: 'key',
    }

    return { ...common, ...map }
  }

  throw ERR_UNKNOWN_LEGACY_MAP
}
