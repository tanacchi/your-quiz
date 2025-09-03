# Mutant 5fac6b77 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5193
**Stable ID**: 5fac6b77
**Location**: L183:10–L183:20

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5193
@@ -179,9 +179,9 @@
     describe("Status Field", () => {
       it.each([
         ["pending_approval", "pending_approval", true],
         ["approved without approvedAt", "approved", false],
-        ["rejected", "rejected", true],
+        ["", "rejected", true],
         ["invalid status", "invalid_status", false],
         ["empty string", "", false],
         ["null value", null, false],
       ])("should validate status: %s -> %s", (_desc, status, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
