# Mutant ad3f74ed Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1761
**Stable ID**: ad3f74ed
**Location**: L113:43–L123:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1761
@@ -109,19 +109,9 @@
         const result = suggestExplanationPatches(input);
         expect(result).toEqual(expected);
       });
 
-      describe("Patch Application", () => {
-        it("should apply truncation patch correctly", () => {
-          const longExplanation = "A".repeat(1001);
-          const input = { ...validQuizInput, explanation: longExplanation };
-          const patches = suggestExplanationPatches(input.explanation);
-          const patched = applyEntityPatch(input, patches.at(0) ?? {});
-
-          expect(patched.explanation).toBe(`${"A".repeat(997)}...`);
-          expect(patched.explanation?.length).toBe(1000);
-        });
-      });
+      describe("Patch Application", () => {});
     });
 
     describe("suggestIdFieldPatches", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
