# Mutant 8c9f5f02 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 494
**Stable ID**: 8c9f5f02
**Location**: L319:19–L319:22

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #494
@@ -315,9 +315,9 @@
         const httpQueryParams = {
           status: ["approved", "pending_approval"],
           creatorId: "user-123",
           limit: "20",
-          offset: "0",
+          offset: "",
         };
         const result = listQueryFromReq.safeParse(httpQueryParams);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
