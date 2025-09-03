# Mutant 609a741f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 3247
**Stable ID**: 609a741f
**Location**: L486:11–L486:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3247
@@ -482,9 +482,9 @@
 
       const result = QuizSchema.safeParse(rejectedQuiz);
       expect(result.success).toBe(true);
 
-      if (result.success) {
+      if (true) {
         expect(result.data.status).toBe("rejected");
         expect(result.data.approvedAt).toBeUndefined();
         expect(result.data.explanation).toContain("rejected");
       }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
