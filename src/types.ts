import {
  BeatmapType,
  IBeatmap,
  IHashBeatmap,
  IKeyBeatmap,
  ILevelIDBeatmap,
  IPlaylist,
  IZipBeatmap,
} from './spec'

export const createKeyBeatmap: (key: number) => IKeyBeatmap = key => ({
  key,
  type: BeatmapType.Key,

  keyHex: () => key.toString(16),
})

export const createHashBeatmap: (hash: Buffer) => IHashBeatmap = hash => ({
  hash,
  type: BeatmapType.Hash,

  hashHex: () => hash.toString('hex').toLowerCase(),
})

export const decoratePlaylist: (
  playlist: IPlaylist
) => IPlaylist = playlist => {
  for (const map of playlist.maps) {
    if (map.type === BeatmapType.Key) {
      map.keyHex = () => map.key.toString(16)
    } else if (map.type === BeatmapType.Hash) {
      map.hashHex = () => map.hash.toString('hex').toLowerCase()
    }
  }

  return playlist
}

// @ts-ignore
export const mapIsKey: (map: IBeatmap) => map is IKeyBeatmap = map =>
  map.type === BeatmapType.Key

// @ts-ignore
export const mapIsHash: (map: IBeatmap) => map is IHashBeatmap = map =>
  map.type === BeatmapType.Hash

// @ts-ignore
export const mapIsZip: (map: IBeatmap) => map is IZipBeatmap = map =>
  map.type === BeatmapType.Zip

// @ts-ignore
export const mapIsLevelID: (map: IBeatmap) => map is ILevelIDBeatmap = map =>
  map.type === BeatmapType.LevelID
