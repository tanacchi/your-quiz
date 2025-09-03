# Mutant 8daddb37 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 5295
**Stable ID**: 8daddb37
**Location**: L328:19–L328:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5295
@@ -324,9 +324,9 @@
 
       it("should accept single tag ID", () => {
         const dataWithSingleTagId = {
           ...validQuizSummaryData,
-          tagIds: ["tag-1"],
+          tagIds: [],
         };
         const result = QuizSummarySchema.safeParse(dataWithSingleTagId);
         expect(result.success).toBe(true);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
