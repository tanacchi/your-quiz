# Mutant 7e81e236 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: MethodExpression
**Original ID**: 2293
**Stable ID**: 7e81e236
**Location**: L580:37–L585:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2293
@@ -576,14 +576,9 @@
         // Should have at least one patch
         expect(result.length).toBeGreaterThanOrEqual(1);
 
         // Last patch should be from consistency checker
-        const hasConsistencyPatch = result.some(
-          (patch) =>
-            typeof patch === "object" &&
-            "answerType" in patch &&
-            patch.answerType === "boolean",
-        );
+        const hasConsistencyPatch = result.every(patch => typeof patch === "object" && "answerType" in patch && patch.answerType === "boolean");
         expect(hasConsistencyPatch).toBe(true);
       });
 
       describe("Integration with applyEntityPatches", () => {
```

## Hint

ミューテータ "MethodExpression" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
