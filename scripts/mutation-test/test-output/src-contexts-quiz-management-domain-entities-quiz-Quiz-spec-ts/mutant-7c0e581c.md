# Mutant 7c0e581c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1273
**Stable ID**: 7c0e581c
**Location**: L466:31–L471:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1273
@@ -462,14 +462,9 @@
 
           const result = Quiz.fromDraft(draft);
           expect(result.isErr()).toBe(true);
 
-          if (result.isErr()) {
-            const approvedAtIssue = result.error.issues.find(
-              (issue) => issue.path[0] === "approvedAt",
-            );
-            expect(approvedAtIssue).toBeDefined();
-          }
+          if (result.isErr()) {}
         });
       });
 
       describe("Patch System Integration", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
