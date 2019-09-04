export interface IPlaylist {
  title: string
  author: string
  description: string | null

  cover: Buffer
  maps: IBeatmap[]
}

export interface IKeyBeatmap {
  type: 'key'
  key: string
}

export interface IHashBeatmap {
  type: 'hash'
  hash: string
}

export interface IZipBeatmap {
  type: 'zip'
  bytes: Buffer
}

export interface ILevelIDBeatmap {
  type: 'levelID'
  levelID: string
}

export interface ICommonBeatmap {
  dateAdded: Date
}

export type IBeatmap = ICommonBeatmap &
  (IKeyBeatmap | IHashBeatmap | IZipBeatmap | ILevelIDBeatmap)
