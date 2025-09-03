# Mutant 1a767d8c Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 527
**Stable ID**: 1a767d8c
**Location**: L363:52–L452:4

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #527
@@ -359,99 +359,10 @@
       });
     });
   });
 
-  describe("Boundary Values and Edge Cases", () => {
-    describe("Limit Boundary Testing", () => {
-      it.each([
-        ["minimum boundary - 1", 1, true],
-        ["just below minimum", 0, false],
-        ["maximum boundary - 100", 100, true],
-        ["just above maximum", 101, false],
-        ["large number", 1000, false],
-        ["Number.MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, false],
-      ])("should handle limit boundary: %s", (_desc, limit, isValid) => {
-        const input = { limit };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
-    });
+  describe("Boundary Values and Edge Cases", () => {});
 
-    describe("Offset Boundary Testing", () => {
-      it.each([
-        ["minimum boundary - 0", 0, true],
-        ["just below minimum", -1, false],
-        ["small positive", 1, true],
-        ["large positive", 999999, true],
-        ["Number.MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, true],
-      ])("should handle offset boundary: %s", (_desc, offset, isValid) => {
-        const input = { offset };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
-    });
-
-    describe("Array Edge Cases", () => {
-      it("should handle empty arrays correctly", () => {
-        const input = {
-          status: [],
-          quizId: [],
-        };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(true); // empty arrays are allowed, status will use default
-      });
-
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
-    describe("Special Characters and Unicode", () => {
-      it.each([
-        ["special characters", "creator-!@#$%"],
-        ["unicode characters", "creator-プログラミング"],
-        ["emoji", "creator-🚀"],
-        ["mixed unicode", "creator-テスト123"],
-        ["URL encoded characters", "creator-test%20user"],
-      ])("should handle %s in creatorId", (_desc, creatorId) => {
-        const input = { creatorId };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.creatorId).toEqual(creatorId);
-        }
-      });
-    });
-  });
-
   describe("Error Handling and Validation Messages", () => {
     describe("Detailed Error Information", () => {
       it("should provide specific error paths for invalid status", () => {
         const input = { status: ["invalid_status"] };
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
