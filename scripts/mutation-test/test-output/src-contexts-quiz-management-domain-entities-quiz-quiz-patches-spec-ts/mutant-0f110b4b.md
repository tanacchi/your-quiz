# Mutant 0f110b4b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1900
**Stable ID**: 0f110b4b
**Location**: L179:43–L187:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1900
@@ -175,17 +175,9 @@
         const result = suggestAnswerTypePatches(input);
         expect(result).toEqual(expected);
       });
 
-      describe("Patch Application", () => {
-        it("should apply boolean correction patch correctly", () => {
-          const input = { ...validQuizInput, answerType: "bool" };
-          const patches = suggestAnswerTypePatches(input.answerType);
-          const patched = applyEntityPatch(input, patches.at(0) ?? {});
-
-          expect(patched.answerType).toBe("boolean");
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
