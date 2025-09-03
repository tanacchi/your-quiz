# Mutant c49c5c4f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3257
**Stable ID**: c49c5c4f
**Location**: L15:23–L15:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.ts	mutated #3257
@@ -11,9 +11,9 @@
   .object({
     id: QuizIdSchema,
     question: z.string().trim().min(1).max(500),
     answerType: z.literal("boolean"), // BooleanSolution only
-    solution: z.union([BooleanSolutionSchema]),
+    solution: z.union([]),
     explanation: z.string().max(1000).optional(),
     status: z.enum(["pending_approval", "approved", "rejected"]),
     creatorId: CreatorIdSchema,
     createdAt: sqliteDateTimeSchema,
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
