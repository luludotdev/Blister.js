export interface ILegacyPlaylist {
  playlistTitle: string
  playlistAuthor: string
  playlistDescription?: string

  image: string | null | undefined
  songs: ILegacyBeatmap[]
}

export interface ILegacyBeatmap {
  key?: string
  hash?: string
  levelId?: string
  dateAdded?: string
}
