# Mutant f002f9cf Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 556
**Stable ID**: f002f9cf
**Location**: L381:10–L381:32

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #556
@@ -377,9 +377,9 @@
     });
 
     describe("Offset Boundary Testing", () => {
       it.each([
-        ["minimum boundary - 0", 0, true],
+        ["", 0, true],
         ["just below minimum", -1, false],
         ["small positive", 1, true],
         ["large positive", 999999, true],
         ["Number.MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
