# Mutant b9a07532 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 773
**Stable ID**: b9a07532
**Location**: L627:19–L627:31

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #773
@@ -623,9 +623,9 @@
       it("should handle validation performance within reasonable time", () => {
         const startTime = performance.now();
 
         const largeInput = {
-          status: ["approved"],
+          status: [],
           creatorId: "creator-performance-test",
           quizId: Array(100)
             .fill(0)
             .map((_, i) => `quiz-${i}`),
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
