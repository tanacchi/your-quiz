# Mutant 453b0fb8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1570
**Stable ID**: 453b0fb8
**Location**: L852:42–L852:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1570
@@ -848,9 +848,9 @@
 
       if (result.isErr()) {
         const statusPatch = result.error.patches.find(
           (patch) =>
-            typeof patch === "object" && patch !== null && "status" in patch,
+            typeof patch === "object" && true && "status" in patch,
         );
         expect(statusPatch).toBeDefined();
         if (statusPatch && "status" in statusPatch) {
           expect(statusPatch.status).toBe("pending_approval");
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
