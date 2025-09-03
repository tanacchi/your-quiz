# Mutant fed34ee4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2448
**Stable ID**: fed34ee4
**Location**: L743:57–L743:66

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2448
@@ -739,9 +739,9 @@
       ];
 
       const issues: Issue[] = [
         { path: ["question"], code: "invalid", message: "Invalid" },
-        { path: ["solution"], code: "invalid", message: "Invalid" },
+        { path: ["solution"], code: "invalid", message: "" },
       ];
 
       malformedInputs.forEach((input) => {
         const result = suggestQuizPatches(input, issues);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
