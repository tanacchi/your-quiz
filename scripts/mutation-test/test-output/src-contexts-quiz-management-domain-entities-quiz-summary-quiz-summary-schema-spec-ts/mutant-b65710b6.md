# Mutant b65710b6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5216
**Stable ID**: b65710b6
**Location**: L202:57–L207:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5216
@@ -198,14 +198,9 @@
         const result = QuizSummarySchema.safeParse(dataWithoutExplanation);
         expect(result.success).toBe(true);
       });
 
-      it("should accept data without approvedAt", () => {
-        const { approvedAt: _approvedAt, ...dataWithoutApprovedAt } =
-          validQuizSummaryData;
-        const result = QuizSummarySchema.safeParse(dataWithoutApprovedAt);
-        expect(result.success).toBe(true);
-      });
+      it("should accept data without approvedAt", () => {});
 
       it("should accept data without tagIds", () => {
         const { tagIds: _tagIds, ...dataWithoutTagIds } = validQuizSummaryData;
         const result = QuizSummarySchema.safeParse(dataWithoutTagIds);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
