# Mutant a9733e80 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5225
**Stable ID**: a9733e80
**Location**: L220:14–L220:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5225
@@ -216,9 +216,9 @@
         }
       });
     });
 
-    describe("Strict Mode", () => {
+    describe("", () => {
       it("should reject data with extra fields", () => {
         const dataWithExtraField = {
           ...validQuizSummaryData,
           extraField: "not allowed",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
