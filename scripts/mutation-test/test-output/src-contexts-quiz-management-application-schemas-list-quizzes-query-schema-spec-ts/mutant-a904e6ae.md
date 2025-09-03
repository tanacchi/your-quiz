# Mutant a904e6ae Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 783
**Stable ID**: a904e6ae
**Location**: L644:23–L644:69

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #783
@@ -640,9 +640,9 @@
         expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
       });
 
       it("should maintain memory efficiency with repeated validations", () => {
-        const input = { status: ["approved"], limit: 10, offset: 0 };
+        const input = {};
 
         // Validate the same input multiple times
         for (let i = 0; i < 100; i++) {
           const result = listQuizzesQuerySchema.safeParse(input);
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
