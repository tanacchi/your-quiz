# Mutant a8c2dd31 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3029
**Stable ID**: a8c2dd31
**Location**: L220:10–L220:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3029
@@ -216,9 +216,9 @@
     });
 
     describe("Status Field", () => {
       it.each([
-        ["pending_approval", "pending_approval", true],
+        ["", "pending_approval", true],
         ["approved without approvedAt", "approved", false],
         ["rejected", "rejected", true],
         ["invalid status", "invalid_status", false],
         ["empty string", "", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
