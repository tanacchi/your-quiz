# Mutant 93d16dcb Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2435
**Stable ID**: 93d16dcb
**Location**: L737:60–L737:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2435
@@ -733,9 +733,9 @@
     });
 
     it("should handle malformed input objects", () => {
       const malformedInputs = [
-        { question: null, answerType: undefined, solution: "invalid" },
+        { question: null, answerType: undefined, solution: "" },
         { id: [], creatorId: {}, solution: 123 },
       ];
 
       const issues: Issue[] = [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
