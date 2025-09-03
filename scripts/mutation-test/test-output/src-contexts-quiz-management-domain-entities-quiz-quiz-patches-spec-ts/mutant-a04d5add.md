# Mutant a04d5add Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2211
**Stable ID**: a04d5add
**Location**: L513:19–L513:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2211
@@ -509,9 +509,9 @@
         const issues: Issue[] = [
           { path: ["id"], code: "invalid", message: "Invalid id" },
           { path: ["question"], code: "invalid", message: "Invalid question" },
           {
-            path: ["explanation"],
+            path: [],
             code: "invalid",
             message: "Invalid explanation",
           },
           {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
