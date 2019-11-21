import { BeatmapType, IHashBeatmap, IKeyBeatmap, IPlaylist } from './spec'

export const createKeyBeatmap: (key: number) => IKeyBeatmap = key => ({
  key,
  type: BeatmapType.Key,

  hex: () => key.toString(16),
})

export const createHashBeatmap: (hash: Buffer) => IHashBeatmap = hash => ({
  hash,
  type: BeatmapType.Hash,

  hex: () => hash.toString('hex').toLowerCase(),
})

export const decoratePlaylist: (
  playlist: IPlaylist
) => IPlaylist = playlist => {
  for (const map of playlist.maps) {
    if (map.type === BeatmapType.Key) {
      map.hex = () => map.key.toString(16)
    } else if (map.type === BeatmapType.Hash) {
      map.hex = () => map.hash.toString('hex').toLowerCase()
    }
  }

  return playlist
}
