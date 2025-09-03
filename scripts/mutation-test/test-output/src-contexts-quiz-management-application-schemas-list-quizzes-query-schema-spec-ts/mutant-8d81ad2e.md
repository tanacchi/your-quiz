# Mutant 8d81ad2e Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 784
**Stable ID**: 8d81ad2e
**Location**: L644:33–L644:45

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #784
@@ -640,9 +640,9 @@
         expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
       });
 
       it("should maintain memory efficiency with repeated validations", () => {
-        const input = { status: ["approved"], limit: 10, offset: 0 };
+        const input = { status: [], limit: 10, offset: 0 };
 
         // Validate the same input multiple times
         for (let i = 0; i < 100; i++) {
           const result = listQuizzesQuerySchema.safeParse(input);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
