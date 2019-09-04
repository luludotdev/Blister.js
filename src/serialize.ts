import bson from 'bson'
import { gunzipSync, gzipSync } from 'zlib'
import { convertBsonBinary } from './binary'
import { ERR_INVALID_BUFFER, ERR_INVALID_PLAYLIST } from './errors'
import { gunzip, gzip } from './gzip'
import { IPlaylist } from './spec'
import { validate } from './validate'

export const serialize: (
  playlist: IPlaylist
) => Promise<Buffer> = async playlist => {
  const valid = validate(playlist)
  if (!valid) throw ERR_INVALID_PLAYLIST

  const serialized = bson.serialize(playlist)
  return gzip(serialized)
}

export const serializeSync: (playlist: IPlaylist) => Buffer = playlist => {
  const valid = validate(playlist)
  if (!valid) throw ERR_INVALID_PLAYLIST

  const serialized = bson.serialize(playlist)
  return gzipSync(serialized)
}

export const deserialize: (
  buffer: Buffer
) => Promise<IPlaylist> = async buffer => {
  if (!Buffer.isBuffer(buffer)) throw ERR_INVALID_BUFFER
  const decomp = await gunzip(buffer)
  const playlist: IPlaylist = bson.deserialize(decomp)

  const valid = validate(playlist)
  if (!valid) throw ERR_INVALID_PLAYLIST

  return convertBsonBinary(playlist)
}

export const deserializeSync: (buffer: Buffer) => IPlaylist = buffer => {
  if (!Buffer.isBuffer(buffer)) throw ERR_INVALID_BUFFER
  const decomp = gunzipSync(buffer)
  const playlist: IPlaylist = bson.deserialize(decomp)

  const valid = validate(playlist)
  if (!valid) throw ERR_INVALID_PLAYLIST

  return convertBsonBinary(playlist)
}
