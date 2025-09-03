# Mutant 0eb15f33 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4505
**Stable ID**: 0eb15f33
**Location**: L406:19–L406:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4505
@@ -402,9 +402,9 @@
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
