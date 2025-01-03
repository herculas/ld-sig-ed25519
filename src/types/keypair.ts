import type { VerificationMethodMap } from "@crumble-jon/ld-crypto-syntax"

/**
 * A JSON-LD document that represents an Ed25519 keypair.
 */
export interface KeypairDocument extends VerificationMethodMap {
  /**
   * The `revoked` property is used to express the date and time when the keypair has been revoked. If not specified, 
   * the keypair is considered active.
   * 
   * The value of this property MUST be a string representation of a date and time.
   */
  revoked?: string
  
  /**
   * The `privateKeyMultibase` property is used to express a private key in multibase format.
   *
   * The value of this property MUST be a string representation of a multibase encoded private key.
   *
   * @see https://datatracker.ietf.org/doc/html/draft-multiformats-multibase-03
   */
  secretKeyMultibase?: string
}
