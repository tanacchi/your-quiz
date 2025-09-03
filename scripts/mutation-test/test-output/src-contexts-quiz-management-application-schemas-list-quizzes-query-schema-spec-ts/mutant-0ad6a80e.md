# Mutant 0ad6a80e Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 72
**Stable ID**: 0ad6a80e
**Location**: L55:10–L55:30

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #72
@@ -51,9 +51,9 @@
           "all valid statuses",
           ["pending_approval", "approved", "rejected"],
           true,
         ],
-        ["duplicate statuses", ["approved", "approved"], true],
+        ["", ["approved", "approved"], true],
         ["invalid status", ["invalid_status"], false],
         ["mixed valid and invalid", ["approved", "invalid"], false],
         ["empty array", [], true], // empty arrays are allowed
         ["non-array value", "approved", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
