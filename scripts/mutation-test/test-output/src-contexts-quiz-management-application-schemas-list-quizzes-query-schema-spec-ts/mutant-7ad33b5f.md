# Mutant 7ad33b5f Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 54
**Stable ID**: 7ad33b5f
**Location**: L48:10–L48:34

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #54
@@ -44,9 +44,9 @@
     describe("Status Field Validation", () => {
       it.each([
         ["single approved status", ["approved"], true],
         ["single pending_approval status", ["pending_approval"], true],
-        ["single rejected status", ["rejected"], true],
+        ["", ["rejected"], true],
         ["multiple valid statuses", ["pending_approval", "approved"], true],
         [
           "all valid statuses",
           ["pending_approval", "approved", "rejected"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
