# Mutant e6a95586 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4692
**Stable ID**: e6a95586
**Location**: L601:17–L601:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4692
@@ -597,9 +597,9 @@
         { id: [], solutionId: {}, creatorId: true },
       ];
 
       const issues: Issue[] = [
-        { path: ["question"], code: "invalid", message: "Invalid" },
+        { path: [], code: "invalid", message: "Invalid" },
         { path: ["answerType"], code: "invalid", message: "Invalid" },
       ];
 
       malformedInputs.forEach((input) => {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
