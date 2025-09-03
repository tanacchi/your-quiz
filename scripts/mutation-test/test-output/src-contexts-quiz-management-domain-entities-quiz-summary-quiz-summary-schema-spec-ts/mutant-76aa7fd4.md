# Mutant 76aa7fd4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 5266
**Stable ID**: 76aa7fd4
**Location**: L290:19–L290:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5266
@@ -286,9 +286,9 @@
     describe("Duplicate TagIds Validation", () => {
       it("should accept unique tag IDs", () => {
         const dataWithUniqueTagIds = {
           ...validQuizSummaryData,
-          tagIds: ["tag-1", "tag-2", "tag-3"],
+          tagIds: [],
         };
         const result = QuizSummarySchema.safeParse(dataWithUniqueTagIds);
         expect(result.success).toBe(true);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
