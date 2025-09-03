# Mutant efe2e830 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5263
**Stable ID**: efe2e830
**Location**: L287:10–L287:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5263
@@ -283,9 +283,9 @@
       });
     });
 
     describe("Duplicate TagIds Validation", () => {
-      it("should accept unique tag IDs", () => {
+      it("", () => {
         const dataWithUniqueTagIds = {
           ...validQuizSummaryData,
           tagIds: ["tag-1", "tag-2", "tag-3"],
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
