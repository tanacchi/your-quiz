# Mutant 3bdef558 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 596
**Stable ID**: 3bdef558
**Location**: L419:51–L432:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #596
@@ -415,22 +415,9 @@
           expect(result.data.quizId).toHaveLength(1);
         }
       });
 
-      it("should handle very large arrays", () => {
-        const largeArray = Array(50)
-          .fill("quiz")
-          .map((_, i) => `quiz-${i}`);
-        const input = {
-          quizId: largeArray,
-        };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.quizId).toHaveLength(50);
-        }
-      });
+      it("should handle very large arrays", () => {});
     });
 
     describe("Special Characters and Unicode", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
