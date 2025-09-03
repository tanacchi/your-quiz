# Mutant f3112ed9 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 59
**Stable ID**: f3112ed9
**Location**: L49:10–L49:35

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #59
@@ -45,9 +45,9 @@
       it.each([
         ["single approved status", ["approved"], true],
         ["single pending_approval status", ["pending_approval"], true],
         ["single rejected status", ["rejected"], true],
-        ["multiple valid statuses", ["pending_approval", "approved"], true],
+        ["", ["pending_approval", "approved"], true],
         [
           "all valid statuses",
           ["pending_approval", "approved", "rejected"],
           true,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
