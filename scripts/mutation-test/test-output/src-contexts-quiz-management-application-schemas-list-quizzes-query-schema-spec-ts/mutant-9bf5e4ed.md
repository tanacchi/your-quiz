# Mutant 9bf5e4ed Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 625
**Stable ID**: 9bf5e4ed
**Location**: L442:65–L450:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #625
@@ -438,17 +438,9 @@
         ["unicode characters", "creator-プログラミング"],
         ["emoji", "creator-🚀"],
         ["mixed unicode", "creator-テスト123"],
         ["URL encoded characters", "creator-test%20user"],
-      ])("should handle %s in creatorId", (_desc, creatorId) => {
-        const input = { creatorId };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.creatorId).toEqual(creatorId);
-        }
-      });
+      ])("should handle %s in creatorId", (_desc, creatorId) => {});
     });
   });
 
   describe("Error Handling and Validation Messages", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
