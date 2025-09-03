# Mutant aeef1207 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: UnaryOperator
**Original ID**: 376
**Stable ID**: aeef1207
**Location**: L221:19–L221:21

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #376
@@ -217,9 +217,9 @@
         const invalidQuery = {
           status: ["invalid_status"],
           creatorId: "", // empty string not allowed
           limit: 0, // below minimum
-          offset: -1, // negative not allowed
+          offset: +1, // negative not allowed
         };
         const result = listQuizzesQuerySchema.safeParse(invalidQuery);
         expect(result.success).toBe(false);
       });
```

## Hint

単項演算子が変更されています（例: !condition → condition）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
