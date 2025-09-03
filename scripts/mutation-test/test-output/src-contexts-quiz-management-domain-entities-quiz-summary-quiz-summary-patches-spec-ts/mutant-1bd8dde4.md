# Mutant 1bd8dde4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4187
**Stable ID**: 1bd8dde4
**Location**: L134:16–L134:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4187
@@ -130,9 +130,9 @@
           expect(result).toEqual(expected);
         });
       });
 
-      describe("Patch Application", () => {
+      describe("", () => {
         it("should apply id trim patch correctly", () => {
           const input = { ...validQuizSummaryInput, id: "  quiz-123  " };
           const patches = suggestIdFieldPatches("id")(input.id);
           expect(patches).toHaveLength(1);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
