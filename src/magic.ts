import { ERR_INVALID_MAGIC_NUMBER } from './errors'

const magicNumberString = 'Blist.v2'
export const magicNumber = Buffer.from(magicNumberString, 'utf-8')

export const validateMagicNumber: (buffer: Buffer) => Buffer = buffer => {
  const magicBytes = buffer.slice(0, magicNumber.length)

  const hasMagicNumber = magicNumber.equals(magicBytes)
  if (!hasMagicNumber) throw ERR_INVALID_MAGIC_NUMBER

  return buffer.slice(magicNumber.length)
}
