# Mutant f336ab46 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 2299
**Stable ID**: f336ab46
**Location**: L582:13–L583:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2299
@@ -578,10 +578,9 @@
 
         // Last patch should be from consistency checker
         const hasConsistencyPatch = result.some(
           (patch) =>
-            typeof patch === "object" &&
-            "answerType" in patch &&
+            typeof patch === "object" || "answerType" in patch &&
             patch.answerType === "boolean",
         );
         expect(hasConsistencyPatch).toBe(true);
       });
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
