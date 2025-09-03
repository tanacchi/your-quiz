# Mutant e88a5ff9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2287
**Stable ID**: e88a5ff9
**Location**: L566:33–L572:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2287
@@ -562,15 +562,9 @@
           answerType: "single_choice",
           solution: { id: "solution-123", value: true },
         };
 
-        const issues: Issue[] = [
-          {
-            path: ["answerType"],
-            code: "invalid",
-            message: "Invalid answerType",
-          },
-        ];
+        const issues: Issue[] = [];
 
         const result = suggestQuizPatches(input, issues);
 
         // Should have at least one patch
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
