# Mutant eaabb14e Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 607
**Stable ID**: eaabb14e
**Location**: L435:54–L451:6

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #607
@@ -431,25 +431,9 @@
         }
       });
     });
 
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
+    describe("Special Characters and Unicode", () => {});
   });
 
   describe("Error Handling and Validation Messages", () => {
     describe("Detailed Error Information", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
