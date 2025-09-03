# Mutant a4a92955 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4098
**Stable ID**: a4a92955
**Location**: L53:55–L62:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4098
@@ -49,19 +49,10 @@
         expect(result).toEqual(expected);
       });
 
       describe("Patch Application", () => {
-        it("should apply trim patch correctly", () => {
-          const input = { ...validQuizSummaryInput, question: "  Untrimmed  " };
-          const patches = suggestQuestionPatches(input.question);
-          expect(patches).toHaveLength(1);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
+        it("should apply trim patch correctly", () => {});
 
-          expect(patched.question).toBe("Untrimmed");
-        });
-
         it("should apply sample question patch correctly", () => {
           const input = { ...validQuizSummaryInput, question: "" };
           const patches = suggestQuestionPatches(input.question);
           expect(patches).toHaveLength(1);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
