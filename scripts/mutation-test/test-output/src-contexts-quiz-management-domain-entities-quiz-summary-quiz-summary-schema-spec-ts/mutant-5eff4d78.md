# Mutant 5eff4d78 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5227
**Stable ID**: 5eff4d78
**Location**: L221:10–L221:48

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5227
@@ -217,9 +217,9 @@
       });
     });
 
     describe("Strict Mode", () => {
-      it("should reject data with extra fields", () => {
+      it("", () => {
         const dataWithExtraField = {
           ...validQuizSummaryData,
           extraField: "not allowed",
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
