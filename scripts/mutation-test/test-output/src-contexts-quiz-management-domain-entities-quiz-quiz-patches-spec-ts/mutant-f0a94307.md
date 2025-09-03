# Mutant f0a94307 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1902
**Stable ID**: f0a94307
**Location**: L180:69–L186:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1902
@@ -176,15 +176,9 @@
         expect(result).toEqual(expected);
       });
 
       describe("Patch Application", () => {
-        it("should apply boolean correction patch correctly", () => {
-          const input = { ...validQuizInput, answerType: "bool" };
-          const patches = suggestAnswerTypePatches(input.answerType);
-          const patched = applyEntityPatch(input, patches.at(0) ?? {});
-
-          expect(patched.answerType).toBe("boolean");
-        });
+        it("should apply boolean correction patch correctly", () => {});
       });
     });
 
     describe("suggestStatusPatches", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
