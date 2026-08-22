# PQC Signature Posture — sealed 22 Aug 2026

Relative to the 31 July investigation and the 15 Aug update.

**Assessment:** PASSED | R=0.18 | crystalline=0.87 (desk target ≥ 0.85; skill target 0.92 not claimed)
**Objective:** intrinsic-pursuit
**Urgent changes:** none
**FN-DSA / FIPS 206:** draft — not production for FIPS-only or high-assurance paths

## Freeze (unchanged)

1. Hybrid classical + PQC during transition.
2. Default production path: ML-DSA-65 via OpenSSL 3.5+, oqs-provider, or Cloud KMS. Hybrid with Ed25519 or ECDSA.
3. Falcon-512 / FN-DSA remains size-critical and experimental until FIPS 206 is final.
4. Diamondnode artifacts continue to emit algorithm-tagged A2A / evt- records. Crystalline target ≥ 0.85.

## Workload lanes

| Workload | Preferred | Hybrid |
| --- | --- | --- |
| General production / OpenShift registry | ML-DSA-65 | Ed25519 or ECDSA P-256 |
| Size-sensitive A2A / RTPTPA | Falcon-512 (test only) | Ed25519 test, else hybrid ML-DSA |
| Long-lived / highest conservatism | SLH-DSA-SHA2-128s | ML-DSA-65 leaf under SLH-DSA root |
| Cloud-managed keys | ML-DSA-65 | Cloud KMS ML-DSA and/or SLH-DSA |
| Diamondnode / A2A attestation | ML-DSA-65 | Ed25519 + algorithm tag |

## Provenance

- `evt-pqc-sig-20260822-completion`
- schema_version 1.0 (gc-workers tunnel-through)
- strand: `lattice-desk-pqc-signature-posture` v1.0.0
