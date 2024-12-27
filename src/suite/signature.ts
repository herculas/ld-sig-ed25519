import {
  type Loader,
  type PlainDocument,
  type Proof,
  Signature,
  type VerificationMethodMap,
  type VerificationResult,
} from "@crumble-jon/ld-crypto-syntax"

import * as CONTEXT_URL from "../context/constants.ts"
import * as SUITE_CONSTANT from "./constants.ts"
import type { Ed25519Keypair } from "../keypair/keypair.ts"
import { sign, verify } from "./core.ts"
import { SuiteError } from "../error/error.ts"
import { SuiteErrorCode } from "../error/constants.ts"

export class Ed25519Signature extends Signature {
  constructor(_keypair: Ed25519Keypair, _time?: Date, _proof?: Proof) {
    super(SUITE_CONSTANT.TYPE, _keypair, CONTEXT_URL.SUITE_2020, _time, _proof)
  }

  override async sign(
    _document: PlainDocument,
    _proof: Proof,
    _verifyData: Uint8Array,
    _loader?: Loader,
  ): Promise<Proof> {
    const signature = await sign(_verifyData, this.keypair as Ed25519Keypair)
    _proof.proofValue = signature
    return _proof
  }

  override async verify(
    _document: PlainDocument,
    _proof: Proof,
    _verifyData: Uint8Array,
    _method: VerificationMethodMap,
    _loader?: Loader,
  ): Promise<VerificationResult> {
    try {
      if (!_proof.proofValue) {
        throw new SuiteError(
          SuiteErrorCode.FORMAT_ERROR,
          "suite/signature.verify",
          "The proof value is missing."
        )
      }

      const result = await verify(_verifyData, _proof.proofValue, this.keypair as Ed25519Keypair)
      return {
        verified: result.verified,
        errors: result.errors,
      }
    } catch (error) {
      return {
        verified: false,
        errors: error as SuiteError,
      }
    }
  }
}