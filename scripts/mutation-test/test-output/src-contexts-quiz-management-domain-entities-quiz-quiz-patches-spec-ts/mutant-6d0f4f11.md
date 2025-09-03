# Mutant 6d0f4f11 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2289
**Stable ID**: 6d0f4f11
**Location**: L568:19–L568:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2289
@@ -564,9 +564,9 @@
         };
 
         const issues: Issue[] = [
           {
-            path: ["answerType"],
+            path: [],
             code: "invalid",
             message: "Invalid answerType",
           },
         ];
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
