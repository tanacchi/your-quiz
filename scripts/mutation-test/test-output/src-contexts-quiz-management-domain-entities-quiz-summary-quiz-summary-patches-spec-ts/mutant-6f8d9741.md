# Mutant 6f8d9741 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 4686
**Stable ID**: 6f8d9741
**Location**: L596:9–L596:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4686
@@ -592,9 +592,9 @@
     });
 
     it("should handle malformed input objects", () => {
       const malformedInputs = [
-        { question: null, answerType: undefined, status: 123 },
+        {},
         { id: [], solutionId: {}, creatorId: true },
       ];
 
       const issues: Issue[] = [
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
