# Mutant 8fff31d8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2445
**Stable ID**: 8fff31d8
**Location**: L743:17–L743:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2445
@@ -739,9 +739,9 @@
       ];
 
       const issues: Issue[] = [
         { path: ["question"], code: "invalid", message: "Invalid" },
-        { path: ["solution"], code: "invalid", message: "Invalid" },
+        { path: [], code: "invalid", message: "Invalid" },
       ];
 
       malformedInputs.forEach((input) => {
         const result = suggestQuizPatches(input, issues);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
