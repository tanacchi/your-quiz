# Mutant 437f81b0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 2284
**Stable ID**: 437f81b0
**Location**: L563:21–L563:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2284
@@ -559,9 +559,9 @@
 
       it("should include consistency patches at the end", () => {
         const input = {
           answerType: "single_choice",
-          solution: { id: "solution-123", value: true },
+          solution: {},
         };
 
         const issues: Issue[] = [
           {
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
