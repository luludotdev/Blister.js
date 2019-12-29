import { ERR_INVALID_BASE64 } from './errors'

const b64RX = /^.+base64,(.+)$/

export const b64ToBuffer: (str: string) => Buffer = str => {
  if (typeof str !== 'string') throw ERR_INVALID_BASE64

  const b64string = str.replace(b64RX, '$1')
  return Buffer.from(b64string, 'base64')
}
