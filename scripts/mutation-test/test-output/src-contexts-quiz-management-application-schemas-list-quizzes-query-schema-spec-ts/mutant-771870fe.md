# Mutant 771870fe Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 66
**Stable ID**: 771870fe
**Location**: L52:11–L52:55

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #66
@@ -48,9 +48,9 @@
         ["single rejected status", ["rejected"], true],
         ["multiple valid statuses", ["pending_approval", "approved"], true],
         [
           "all valid statuses",
-          ["pending_approval", "approved", "rejected"],
+          [],
           true,
         ],
         ["duplicate statuses", ["approved", "approved"], true],
         ["invalid status", ["invalid_status"], false],
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
