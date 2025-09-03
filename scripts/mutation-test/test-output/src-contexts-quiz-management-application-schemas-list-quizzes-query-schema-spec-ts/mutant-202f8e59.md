# Mutant 202f8e59 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 60
**Stable ID**: 202f8e59
**Location**: L49:37–L49:69

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #60
@@ -45,9 +45,9 @@
       it.each([
         ["single approved status", ["approved"], true],
         ["single pending_approval status", ["pending_approval"], true],
         ["single rejected status", ["rejected"], true],
-        ["multiple valid statuses", ["pending_approval", "approved"], true],
+        ["multiple valid statuses", [], true],
         [
           "all valid statuses",
           ["pending_approval", "approved", "rejected"],
           true,
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
