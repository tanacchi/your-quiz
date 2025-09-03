# Mutant 3d928f27 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 4687
**Stable ID**: 3d928f27
**Location**: L597:9–L597:52

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4687
@@ -593,9 +593,9 @@
 
     it("should handle malformed input objects", () => {
       const malformedInputs = [
         { question: null, answerType: undefined, status: 123 },
-        { id: [], solutionId: {}, creatorId: true },
+        {},
       ];
 
       const issues: Issue[] = [
         { path: ["question"], code: "invalid", message: "Invalid" },
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
