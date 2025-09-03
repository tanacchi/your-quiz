# Mutant 88cc0da3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 2434
**Stable ID**: 88cc0da3
**Location**: L737:9–L737:71

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2434
@@ -733,9 +733,9 @@
     });
 
     it("should handle malformed input objects", () => {
       const malformedInputs = [
-        { question: null, answerType: undefined, solution: "invalid" },
+        {},
         { id: [], creatorId: {}, solution: 123 },
       ];
 
       const issues: Issue[] = [
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
