import { Binary } from 'bson'
import { keyRX } from './beatsaverKey'
import {
  ERR_INVALID_MAP_DATE,
  ERR_INVALID_MAP_HASH,
  ERR_INVALID_MAP_KEY,
  ERR_INVALID_MAP_TYPE,
  ERR_UNKNOWN_MAP_TYPE,
} from './errors'
import {
  BeatmapType,
  IBeatmap,
  ICommonBeatmap,
  IHashBeatmap,
  IKeyBeatmap,
  ILevelIDBeatmap,
  IPlaylist,
  IZipBeatmap,
} from './spec'

export const validate: (playlist: IPlaylist) => boolean = playlist => {
  if (!playlist) return false
  if (typeof playlist.title !== 'string') return false
  if (typeof playlist.author !== 'string') return false
  if (
    typeof playlist.description !== 'string' &&
    playlist.description !== null
  ) {
    return false
  }

  if (playlist.cover !== null) {
    if (!isBinary(playlist.cover)) return false
  }

  for (const map of playlist.maps) {
    if (map.type === BeatmapType.Key) validateKeyMap(map)
    else if (map.type === BeatmapType.Hash) validateHashMap(map)
    else if (map.type === BeatmapType.Zip) validateZipMap(map)
    else if (map.type === BeatmapType.LevelID) validateLevelIdMap(map)
    else throw ERR_UNKNOWN_MAP_TYPE
  }

  return true
}

const validateCommonMap: (map: IBeatmap) => void = map => {
  if (typeof map.type !== 'number') throw ERR_INVALID_MAP_TYPE
  if (!(map.dateAdded instanceof Date)) throw ERR_INVALID_MAP_DATE
}

const validateKeyMap: (map: ICommonBeatmap & IKeyBeatmap) => void = map => {
  validateCommonMap(map)
  const err = ERR_INVALID_MAP_KEY(map.key)

  if (typeof map.key !== 'number') throw err
  if (!map.key) throw err
  if (!keyRX.test(map.keyHex)) throw err
}

const validateHashMap: (map: ICommonBeatmap & IHashBeatmap) => void = map => {
  validateCommonMap(map)

  if (!isBinary(map.hash)) throw ERR_INVALID_MAP_HASH(map.hash)
}

const validateZipMap: (map: ICommonBeatmap & IZipBeatmap) => void = map => {
  validateCommonMap(map)
}

const validateLevelIdMap: (
  map: ICommonBeatmap & ILevelIDBeatmap
) => void = map => {
  validateCommonMap(map)
}

const isBinary: (blob: any) => boolean = blob => {
  if (Buffer.isBuffer(blob)) return true
  if (blob instanceof Uint8Array) return true
  if (blob instanceof Binary) return true

  return false
}
