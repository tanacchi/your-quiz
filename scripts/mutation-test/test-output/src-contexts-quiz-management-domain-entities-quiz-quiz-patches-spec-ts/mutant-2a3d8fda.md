# Mutant 2a3d8fda Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2475
**Stable ID**: 2a3d8fda
**Location**: L774:15–L774:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2475
@@ -770,9 +770,9 @@
   describe("Performance and Large Data Handling", () => {
     it("should handle large number of issues efficiently", () => {
       const largeIssues: Issue[] = Array.from({ length: 100 }, (_, i) => ({
         path: ["question"],
-        code: `error-${i}`,
+        code: ``,
         message: `Error ${i}`,
       }));
 
       const result = suggestQuizPatches(
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
