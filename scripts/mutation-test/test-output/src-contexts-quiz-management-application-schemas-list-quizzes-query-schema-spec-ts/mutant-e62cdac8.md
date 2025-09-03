# Mutant e62cdac8 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 94
**Stable ID**: e62cdac8
**Location**: L59:29–L59:39

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #94
@@ -55,9 +55,9 @@
         ["duplicate statuses", ["approved", "approved"], true],
         ["invalid status", ["invalid_status"], false],
         ["mixed valid and invalid", ["approved", "invalid"], false],
         ["empty array", [], true], // empty arrays are allowed
-        ["non-array value", "approved", false],
+        ["non-array value", "", false],
         ["null value", null, false],
         ["undefined value", undefined, true], // Should apply default
       ])("should validate status: %s -> %s", (_desc, status, isValid) => {
         const input = status === undefined ? {} : { status };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
