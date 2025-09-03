# Mutant 528b36b6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 5290
**Stable ID**: 528b36b6
**Location**: L319:19–L319:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5290
@@ -315,9 +315,9 @@
 
       it("should accept empty tag IDs array", () => {
         const dataWithEmptyTagIds = {
           ...validQuizSummaryData,
-          tagIds: [],
+          tagIds: ["Stryker was here"],
         };
         const result = QuizSummarySchema.safeParse(dataWithEmptyTagIds);
         expect(result.success).toBe(true);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
