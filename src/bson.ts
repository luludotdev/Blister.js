import bson from 'bson'

const optionalRequire: <T = any>(mod: string) => T | undefined = mod => {
  try {
    const x = require(mod)
    return x
  } catch (err) {
    return undefined
  }
}

const BSONExt = optionalRequire('bson-ext')
const bsonExt =
  BSONExt === undefined
    ? undefined
    : new BSONExt([
        BSONExt.Binary,
        BSONExt.Code,
        BSONExt.DBRef,
        BSONExt.Decimal128,
        BSONExt.Double,
        BSONExt.Int32,
        BSONExt.Long,
        BSONExt.Map,
        BSONExt.MaxKey,
        BSONExt.MinKey,
        BSONExt.ObjectId,
        BSONExt.BSONRegExp,
        BSONExt.Symbol,
        BSONExt.Timestamp,
      ])

export const serialize: typeof bson.serialize = (...args) => {
  if (bsonExt === undefined) return bson.serialize(...args)
  else return bsonExt.serialize(...args)
}

export const deserialize: <T = any>(
  ...args: Parameters<typeof bson.deserialize>
) => T = (...args) => {
  if (bsonExt === undefined) return bson.deserialize(...args)
  else return bsonExt.deserialize(...args)
}
