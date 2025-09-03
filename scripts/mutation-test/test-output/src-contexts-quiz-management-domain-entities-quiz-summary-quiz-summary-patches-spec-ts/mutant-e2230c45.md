# Mutant e2230c45 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4257
**Stable ID**: e2230c45
**Location**: L169:43–L180:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4257
@@ -165,20 +165,9 @@
         const result = suggestAnswerTypePatches(input);
         expect(result).toEqual(expected);
       });
 
-      describe("Patch Application", () => {
-        it("should apply answerType correction patch correctly", () => {
-          const input = { ...validQuizSummaryInput, answerType: "single" };
-          const patches = suggestAnswerTypePatches(input.answerType);
-          expect(patches).toHaveLength(1);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
-
-          expect(patched.answerType).toBe("single_choice");
-        });
-      });
+      describe("Patch Application", () => {});
     });
 
     describe("suggestStatusPatches", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
