# Mutant 9ad5ccb1 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 89
**Stable ID**: 9ad5ccb1
**Location**: L58:10–L58:23

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #89
@@ -54,9 +54,9 @@
         ],
         ["duplicate statuses", ["approved", "approved"], true],
         ["invalid status", ["invalid_status"], false],
         ["mixed valid and invalid", ["approved", "invalid"], false],
-        ["empty array", [], true], // empty arrays are allowed
+        ["", [], true], // empty arrays are allowed
         ["non-array value", "approved", false],
         ["null value", null, false],
         ["undefined value", undefined, true], // Should apply default
       ])("should validate status: %s -> %s", (_desc, status, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
