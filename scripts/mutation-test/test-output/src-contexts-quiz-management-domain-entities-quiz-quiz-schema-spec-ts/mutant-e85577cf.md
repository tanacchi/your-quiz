# Mutant e85577cf Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3037
**Stable ID**: e85577cf
**Location**: L222:10–L222:20

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3037
@@ -218,9 +218,9 @@
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
