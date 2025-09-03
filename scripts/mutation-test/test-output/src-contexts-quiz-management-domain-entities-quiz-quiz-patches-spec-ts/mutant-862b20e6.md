# Mutant 862b20e6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2112
**Stable ID**: 862b20e6
**Location**: L410:73–L419:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2112
@@ -406,19 +406,10 @@
         expect(result).toEqual([]);
       });
 
       describe("Patch Application", () => {
-        it("should apply answerType consistency patch correctly", () => {
-          const input = {
-            ...validQuizInput,
-            answerType: "single_choice" as "boolean",
-          };
-          const patches = suggestAnswerTypeSolutionConsistencyPatches(input);
-          const patched = applyEntityPatch(input, patches.at(0) ?? {});
+        it("should apply answerType consistency patch correctly", () => {});
 
-          expect(patched.answerType).toBe("boolean");
-        });
-
         it("should apply solution consistency patch correctly", () => {
           const mockTimestamp = 1234567890;
           vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
