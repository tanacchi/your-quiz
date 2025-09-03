# Mutant 969cbf37 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5213
**Stable ID**: 969cbf37
**Location**: L195:58–L200:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5213
@@ -191,14 +191,9 @@
       });
     });
 
     describe("Optional Fields", () => {
-      it("should accept data without explanation", () => {
-        const { explanation: _explanation, ...dataWithoutExplanation } =
-          validQuizSummaryData;
-        const result = QuizSummarySchema.safeParse(dataWithoutExplanation);
-        expect(result.success).toBe(true);
-      });
+      it("should accept data without explanation", () => {});
 
       it("should accept data without approvedAt", () => {
         const { approvedAt: _approvedAt, ...dataWithoutApprovedAt } =
           validQuizSummaryData;
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
