# Mutant a867c080 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 529
**Stable ID**: a867c080
**Location**: L364:46–L377:6

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #529
@@ -360,22 +360,9 @@
     });
   });
 
   describe("Boundary Values and Edge Cases", () => {
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
+    describe("Limit Boundary Testing", () => {});
 
     describe("Offset Boundary Testing", () => {
       it.each([
         ["minimum boundary - 0", 0, true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
