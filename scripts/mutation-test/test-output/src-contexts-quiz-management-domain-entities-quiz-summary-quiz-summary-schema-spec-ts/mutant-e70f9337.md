# Mutant e70f9337 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5292
**Stable ID**: e70f9337
**Location**: L325:10–L325:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5292
@@ -321,9 +321,9 @@
         const result = QuizSummarySchema.safeParse(dataWithEmptyTagIds);
         expect(result.success).toBe(true);
       });
 
-      it("should accept single tag ID", () => {
+      it("", () => {
         const dataWithSingleTagId = {
           ...validQuizSummaryData,
           tagIds: ["tag-1"],
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
