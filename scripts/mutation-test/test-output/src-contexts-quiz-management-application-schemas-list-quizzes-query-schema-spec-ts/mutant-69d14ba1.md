# Mutant 69d14ba1 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 86
**Stable ID**: 69d14ba1
**Location**: L57:50–L57:59

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #86
@@ -53,9 +53,9 @@
           true,
         ],
         ["duplicate statuses", ["approved", "approved"], true],
         ["invalid status", ["invalid_status"], false],
-        ["mixed valid and invalid", ["approved", "invalid"], false],
+        ["mixed valid and invalid", ["approved", ""], false],
         ["empty array", [], true], // empty arrays are allowed
         ["non-array value", "approved", false],
         ["null value", null, false],
         ["undefined value", undefined, true], // Should apply default
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
