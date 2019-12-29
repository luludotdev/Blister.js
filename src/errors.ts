export const ERR_INVALID_PLAYLIST = new Error('invalid playlist')
export const ERR_INVALID_BASE64 = new Error('invalid base64 string')
export const ERR_INVALID_BUFFER = new Error('invalid buffer')

export const ERR_INVALID_MAGIC_NUMBER = new Error('invalid magic number')

export const ERR_UNKNOWN_LEGACY_MAP = new Error('unknown legacy map type')

export const ERR_UNKNOWN_MAP_TYPE = new Error('unknown map type')
export const ERR_INVALID_MAP_TYPE = new Error('invalid map type')
export const ERR_INVALID_MAP_DATE = new Error('invalid map dateAdded')

export const ERR_INVALID_COVER_FILE_TYPE = new Error('invalid cover file type')
export const ERR_INVALID_LEGACY_COVER_IMAGE = new Error(
  'invalid legacy cover image'
)

export const ERR_INVALID_MAP_BYTES = new Error('invalid map bytes')
export const ERR_INVALID_MAP_KEY = (key: string | number) =>
  new Error(`invalid map key: \`${key}\``)
export const ERR_INVALID_MAP_HASH = (hash: string | Buffer) => {
  const hex = hash instanceof Buffer ? hash.toString('hex') : hash
  return new Error(`invalid map hash: \`${hex}\``)
}

export const ERR_INVALID_BEATSAVER_KEY = (key: string | number) =>
  new Error(`invalid beatsaver key: \`${key}\``)
