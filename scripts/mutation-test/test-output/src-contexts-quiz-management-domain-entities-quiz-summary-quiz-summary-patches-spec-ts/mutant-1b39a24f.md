# Mutant 1b39a24f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4189
**Stable ID**: 1b39a24f
**Location**: L135:12–L135:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4189
@@ -131,9 +131,9 @@
         });
       });
 
       describe("Patch Application", () => {
-        it("should apply id trim patch correctly", () => {
+        it("", () => {
           const input = { ...validQuizSummaryInput, id: "  quiz-123  " };
           const patches = suggestIdFieldPatches("id")(input.id);
           expect(patches).toHaveLength(1);
           const patch = patches[0];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
