import { promisify } from 'util'
import { gunzip, gzip, InputType } from 'zlib'

const pGzip: (input: InputType) => Promise<Buffer> = promisify(gzip)
const pGunzip: (input: InputType) => Promise<Buffer> = promisify(gunzip)

export { pGzip as gzip, pGunzip as gunzip }
