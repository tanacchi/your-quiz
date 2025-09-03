# Mutant eff6e48e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2070
**Stable ID**: eff6e48e
**Location**: L347:70–L359:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2070
@@ -343,21 +343,9 @@
 
           vi.restoreAllMocks();
         });
 
-        it("should apply solution correction patch correctly", () => {
-          const input = {
-            ...validQuizInput,
-            solution: { id: "  solution-123  ", value: "true" },
-          };
-          const patches = suggestSolutionPatches(input.solution);
-          const patched = applyEntityPatch(input, patches.at(0) ?? {});
-
-          expect(patched.solution).toEqual({
-            id: "solution-123",
-            value: true,
-          });
-        });
+        it("should apply solution correction patch correctly", () => {});
       });
     });
 
     describe("suggestAnswerTypeSolutionConsistencyPatches", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
