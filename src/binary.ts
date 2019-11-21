import { Binary } from 'bson'
import { ERR_INVALID_BASE64 } from './errors'
import { BeatmapType, IPlaylist } from './spec'

const b64RX = /^.+base64,(.+)$/

export const b64ToBuffer: (str: string) => Buffer = str => {
  if (typeof str !== 'string') throw ERR_INVALID_BASE64

  const b64string = str.replace(b64RX, '$1')
  return Buffer.from(b64string, 'base64')
}

export const convertBsonBinary: (
  playlist: IPlaylist
) => IPlaylist = playlist => {
  if (playlist.cover instanceof Binary) {
    playlist.cover = playlist.cover.buffer
  }

  for (const map of playlist.maps) {
    if (map.type === BeatmapType.Hash && map.hash instanceof Binary) {
      map.hash = map.hash.buffer
    } else if (map.type === BeatmapType.Zip && map.bytes instanceof Binary) {
      map.bytes = map.bytes.buffer
    }
  }

  return playlist
}
