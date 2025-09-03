# Mutant 9f22332c Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 771
**Stable ID**: 9f22332c
**Location**: L623:79–L641:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #771
@@ -619,28 +619,10 @@
       });
     });
 
     describe("Performance and Memory", () => {
-      it("should handle validation performance within reasonable time", () => {
-        const startTime = performance.now();
+      it("should handle validation performance within reasonable time", () => {});
 
-        const largeInput = {
-          status: ["approved"],
-          creatorId: "creator-performance-test",
-          quizId: Array(100)
-            .fill(0)
-            .map((_, i) => `quiz-${i}`),
-          limit: 100,
-          offset: 0,
-        };
-
-        const result = listQuizzesQuerySchema.safeParse(largeInput);
-        const endTime = performance.now();
-
-        expect(result.success).toBe(true);
-        expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
-      });
-
       it("should maintain memory efficiency with repeated validations", () => {
         const input = { status: ["approved"], limit: 10, offset: 0 };
 
         // Validate the same input multiple times
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
