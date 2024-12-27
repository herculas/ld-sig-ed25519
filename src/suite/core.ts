import { base58 } from "@scure/base"
import type { VerificationResult } from "@crumble-jon/ld-crypto-syntax"

import * as KEYPAIR_CONSTANT from "../keypair/constants.ts"
import * as SUITE_CONSTANT from "./constants.ts"
import { SuiteError } from "../error/error.ts"
import { SuiteErrorCode } from "../error/constants.ts"
import type { Ed25519Keypair } from "../keypair/keypair.ts"

/**
 * Sign a message in `Uint8Array` format with a `Ed25519Keypair`.
 *
 * @param {Uint8Array} data The message to be signed.
 * @param {Ed25519Keypair} keypair The keypair to sign the message.
 *
 * @returns {Promise<string>} The signature of the message.
 */
export async function sign(
  data: Uint8Array,
  keypair: Ed25519Keypair,
): Promise<string> {
  if (!keypair.privateKey) {
    throw new SuiteError(
      SuiteErrorCode.KEY_NOT_FOUND,
      "suite/core.sign",
      "The keypair does not have a private key.",
    )
  }
  const signature = await crypto.subtle.sign(SUITE_CONSTANT.ALGORITHM, keypair.privateKey, data)
  return KEYPAIR_CONSTANT.MULTIBASE_BASE58_BTC_PREFIX + base58.encode(new Uint8Array(signature))
}

/**
 * Verify a signature against a message with a public key.
 *
 * @param {Uint8Array} data The message to be verified.
 * @param {Uint8Array} signature The signature to be verified.
 * @param {Ed25519Keypair} keypair The keypair to verify the signature.
 *
 * @returns {Promise<VerificationResult>} The result of the verification.
 */
export async function verify(
  data: Uint8Array,
  signature: string,
  keypair: Ed25519Keypair,
): Promise<VerificationResult> {
  try {
    if (!keypair.publicKey) {
      throw new SuiteError(
        SuiteErrorCode.KEY_NOT_FOUND,
        "suite/core.verify",
        "The keypair does not have a public key.",
      )
    }

    if (!signature.startsWith(KEYPAIR_CONSTANT.MULTIBASE_BASE58_BTC_PREFIX)) {
      throw new SuiteError(
        SuiteErrorCode.FORMAT_ERROR,
        "suite/core.verify",
        "The signature is not in the correct format.",
      )
    }
    const signatureBytes = base58.decode(signature.slice(KEYPAIR_CONSTANT.MULTIBASE_BASE58_BTC_PREFIX.length))
    return {
      verified: await crypto.subtle.verify(SUITE_CONSTANT.ALGORITHM, keypair.publicKey, signatureBytes, data),
    }
  } catch (error) {
    return {
      verified: false,
      errors: error as SuiteError,
    }
  }
}