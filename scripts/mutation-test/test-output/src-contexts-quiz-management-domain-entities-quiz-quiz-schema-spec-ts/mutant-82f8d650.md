# Mutant 82f8d650 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3034
**Stable ID**: 82f8d650
**Location**: L221:41–L221:51

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3034
@@ -217,9 +217,9 @@
 
     describe("Status Field", () => {
       it.each([
         ["pending_approval", "pending_approval", true],
-        ["approved without approvedAt", "approved", false],
+        ["approved without approvedAt", "", false],
         ["rejected", "rejected", true],
         ["invalid status", "invalid_status", false],
         ["empty string", "", false],
         ["null value", null, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
