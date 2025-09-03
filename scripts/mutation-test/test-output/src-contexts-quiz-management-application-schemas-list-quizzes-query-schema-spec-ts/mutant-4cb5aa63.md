# Mutant 4cb5aa63 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 552
**Stable ID**: 4cb5aa63
**Location**: L379:14–L379:39

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #552
@@ -375,9 +375,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("Offset Boundary Testing", () => {
+    describe("", () => {
       it.each([
         ["minimum boundary - 0", 0, true],
         ["just below minimum", -1, false],
         ["small positive", 1, true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
