# Mutant b0edc004 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 768
**Stable ID**: b0edc004
**Location**: L622:14–L622:38

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #768
@@ -618,9 +618,9 @@
         }
       });
     });
 
-    describe("Performance and Memory", () => {
+    describe("", () => {
       it("should handle validation performance within reasonable time", () => {
         const startTime = performance.now();
 
         const largeInput = {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
