# Mutant 1ce09ffc Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1992
**Stable ID**: 1ce09ffc
**Location**: L215:43–L223:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1992
@@ -211,17 +211,9 @@
         const result = suggestStatusPatches(input);
         expect(result).toEqual(expected);
       });
 
-      describe("Patch Application", () => {
-        it("should apply status correction patch correctly", () => {
-          const input = { ...validQuizInput, status: "pending" };
-          const patches = suggestStatusPatches(input.status);
-          const patched = applyEntityPatch(input, patches.at(0) ?? {});
-
-          expect(patched.status).toBe("pending_approval");
-        });
-      });
+      describe("Patch Application", () => {});
     });
 
     describe("suggestSolutionPatches", () => {
       it("should handle null solution", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
