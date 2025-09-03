# Mutant 59ae2444 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 575
**Stable ID**: 59ae2444
**Location**: L393:40–L433:6

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #575
@@ -389,50 +389,10 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("Array Edge Cases", () => {
-      it("should handle empty arrays correctly", () => {
-        const input = {
-          status: [],
-          quizId: [],
-        };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(true); // empty arrays are allowed, status will use default
-      });
+    describe("Array Edge Cases", () => {});
 
-      it("should handle single-item arrays", () => {
-        const input = {
-          status: ["approved"],
-          creatorId: "single-creator",
-          quizId: ["single-quiz"],
-        };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.status).toHaveLength(1);
-          expect(result.data.creatorId).toBe("single-creator");
-          expect(result.data.quizId).toHaveLength(1);
-        }
-      });
-
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
-    });
-
     describe("Special Characters and Unicode", () => {
       it.each([
         ["special characters", "creator-!@#$%"],
         ["unicode characters", "creator-プログラミング"],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
