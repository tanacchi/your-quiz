# Mutant 927f47c6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 992
**Stable ID**: 927f47c6
**Location**: L112:27–L117:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #992
@@ -108,14 +108,9 @@
 
       const result = Quiz.from(noSolutionData);
       expect(result.isErr()).toBe(true);
 
-      if (result.isErr()) {
-        const hasSolutionIssue = result.error.issues.some(
-          (issue) => issue.path[0] === "solution",
-        );
-        expect(hasSolutionIssue).toBe(true);
-      }
+      if (result.isErr()) {}
     });
   });
 
   describe("Business Logic", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
