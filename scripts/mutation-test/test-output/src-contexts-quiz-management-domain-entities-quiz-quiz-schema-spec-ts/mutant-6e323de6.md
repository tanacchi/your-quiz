# Mutant 6e323de6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3106
**Stable ID**: 6e323de6
**Location**: L289:10–L289:60

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3106
@@ -285,9 +285,9 @@
         const result = QuizSchema.safeParse(approvedData);
         expect(result.success).toBe(true);
       });
 
-      it("should reject approved status without approvedAt", () => {
+      it("", () => {
         const approvedWithoutTimestamp = {
           ...validQuizData,
           status: "approved" as const,
           approvedAt: undefined,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
