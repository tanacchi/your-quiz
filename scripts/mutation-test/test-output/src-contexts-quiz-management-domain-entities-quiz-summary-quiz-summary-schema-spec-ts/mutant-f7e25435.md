# Mutant f7e25435 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5271
**Stable ID**: f7e25435
**Location**: L296:10–L296:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5271
@@ -292,9 +292,9 @@
         const result = QuizSummarySchema.safeParse(dataWithUniqueTagIds);
         expect(result.success).toBe(true);
       });
 
-      it("should reject duplicate tag IDs", () => {
+      it("", () => {
         const dataWithDuplicateTagIds = {
           ...validQuizSummaryData,
           tagIds: ["tag-1", "tag-2", "tag-1"],
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
