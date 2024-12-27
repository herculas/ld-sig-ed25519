export const MULTI_CODEC_PUBLIC_PREFIX = new Uint8Array([0xed, 0x01])
export const MULTI_CODEC_PRIVATE_PREFIX = new Uint8Array([0x80, 0x26])

export const DER_PUBLIC_KEY_PREFIX = new Uint8Array([
  0x30,
  0x2a,
  0x30,
  0x05,
  0x06,
  0x03,
  0x2b,
  0x65,
  0x70,
  0x03,
  0x21,
  0x00,
])

export const DER_PRIVATE_KEY_PREFIX = new Uint8Array([
  0x30,
  0x2e,
  0x02,
  0x01,
  0x00,
  0x30,
  0x05,
  0x06,
  0x03,
  0x2b,
  0x65,
  0x70,
  0x04,
  0x22,
  0x04,
  0x20,
])

export const MULTIBASE_BASE58_BTC_PREFIX = "z"
export const KEYPAIR_TYPE_MAIN = "Ed25519VerificationKey2020"
export const KEYPAIR_TYPE_JWK = "JsonWebKey2020"
