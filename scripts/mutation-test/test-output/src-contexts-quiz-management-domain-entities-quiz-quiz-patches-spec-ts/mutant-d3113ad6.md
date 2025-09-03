# Mutant d3113ad6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1994
**Stable ID**: d3113ad6
**Location**: L216:68–L222:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1994
@@ -212,15 +212,9 @@
         expect(result).toEqual(expected);
       });
 
       describe("Patch Application", () => {
-        it("should apply status correction patch correctly", () => {
-          const input = { ...validQuizInput, status: "pending" };
-          const patches = suggestStatusPatches(input.status);
-          const patched = applyEntityPatch(input, patches.at(0) ?? {});
-
-          expect(patched.status).toBe("pending_approval");
-        });
+        it("should apply status correction patch correctly", () => {});
       });
     });
 
     describe("suggestSolutionPatches", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
