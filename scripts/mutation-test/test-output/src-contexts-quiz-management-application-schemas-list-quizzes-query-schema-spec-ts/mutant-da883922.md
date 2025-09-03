# Mutant da883922 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 65
**Stable ID**: da883922
**Location**: L51:11–L51:31

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #65
@@ -47,9 +47,9 @@
         ["single pending_approval status", ["pending_approval"], true],
         ["single rejected status", ["rejected"], true],
         ["multiple valid statuses", ["pending_approval", "approved"], true],
         [
-          "all valid statuses",
+          "",
           ["pending_approval", "approved", "rejected"],
           true,
         ],
         ["duplicate statuses", ["approved", "approved"], true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
