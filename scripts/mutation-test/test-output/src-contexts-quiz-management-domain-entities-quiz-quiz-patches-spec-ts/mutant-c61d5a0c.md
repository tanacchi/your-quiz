# Mutant c61d5a0c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2290
**Stable ID**: c61d5a0c
**Location**: L568:20–L568:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2290
@@ -564,9 +564,9 @@
         };
 
         const issues: Issue[] = [
           {
-            path: ["answerType"],
+            path: [""],
             code: "invalid",
             message: "Invalid answerType",
           },
         ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
