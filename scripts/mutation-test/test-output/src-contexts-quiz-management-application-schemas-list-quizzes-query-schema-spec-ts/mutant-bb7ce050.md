# Mutant bb7ce050 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 80
**Stable ID**: bb7ce050
**Location**: L56:29–L56:45

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #80
@@ -52,9 +52,9 @@
           ["pending_approval", "approved", "rejected"],
           true,
         ],
         ["duplicate statuses", ["approved", "approved"], true],
-        ["invalid status", ["invalid_status"], false],
+        ["invalid status", [""], false],
         ["mixed valid and invalid", ["approved", "invalid"], false],
         ["empty array", [], true], // empty arrays are allowed
         ["non-array value", "approved", false],
         ["null value", null, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
