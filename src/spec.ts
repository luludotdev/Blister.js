export interface IPlaylist {
  title: string
  author: string
  description: string | null

  cover: Buffer | null
  maps: IBeatmap[]
}

export const enum BeatmapType {
  Key = 0,
  Hash = 1,
  Zip = 2,
  LevelID = 3,
}

export interface IKeyBeatmap {
  type: BeatmapType.Key
  key: number
  keyHex: string
}

export interface IHashBeatmap {
  type: BeatmapType.Hash
  hash: Buffer
  hashHex: string
}

export interface IZipBeatmap {
  type: BeatmapType.Zip
  bytes: Buffer
}

export interface ILevelIDBeatmap {
  type: BeatmapType.LevelID
  levelID: string
}

export interface ICommonBeatmap {
  dateAdded: Date
}

export type IBeatmap = ICommonBeatmap &
  (IKeyBeatmap | IHashBeatmap | IZipBeatmap | ILevelIDBeatmap)
