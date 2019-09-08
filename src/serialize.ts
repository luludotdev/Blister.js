import bson from 'bson'
import { gunzipSync, gzipSync } from 'zlib'
import { convertBsonBinary } from './binary'
import { ERR_INVALID_BUFFER, ERR_INVALID_PLAYLIST } from './errors'
import { gunzip, gzip } from './gzip'
import { IPlaylist } from './spec'
import { validate } from './validate'

/**
 * Serialize a playlist object to a Blister file
 * @param playlist Playlist object
 */
export const serialize: (
  playlist: IPlaylist
) => Promise<Buffer> = async playlist => {
  const valid = validate(playlist)
  if (!valid) throw ERR_INVALID_PLAYLIST

  const serialized = bson.serialize(playlist)
  return gzip(serialized)
}

/**
 * Synchronously Serialize a playlist object to a Blister file
 * @param playlist Playlist object
 */
export const serializeSync: (playlist: IPlaylist) => Buffer = playlist => {
  const valid = validate(playlist)
  if (!valid) throw ERR_INVALID_PLAYLIST

  const serialized = bson.serialize(playlist)
  return gzipSync(serialized)
}

/**
 * Deserialize a Blister file buffer to a Playlist object
 * @param buffer Blister file buffer
 */
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

/**
 * Synchronously deserialize a Blister file buffer to a Playlist object
 * @param buffer Blister file buffer
 */
export const deserializeSync: (buffer: Buffer) => IPlaylist = buffer => {
  if (!Buffer.isBuffer(buffer)) throw ERR_INVALID_BUFFER
  const decomp = gunzipSync(buffer)
  const playlist: IPlaylist = bson.deserialize(decomp)

  const valid = validate(playlist)
  if (!valid) throw ERR_INVALID_PLAYLIST

  return convertBsonBinary(playlist)
}
