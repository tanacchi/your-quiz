# Mutant f207a7a3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 1566
**Stable ID**: f207a7a3
**Location**: L852:13–L852:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1566
@@ -848,9 +848,9 @@
 
       if (result.isErr()) {
         const statusPatch = result.error.patches.find(
           (patch) =>
-            typeof patch === "object" && patch !== null && "status" in patch,
+            typeof patch === "object" || patch !== null && "status" in patch,
         );
         expect(statusPatch).toBeDefined();
         if (statusPatch && "status" in statusPatch) {
           expect(statusPatch.status).toBe("pending_approval");
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
