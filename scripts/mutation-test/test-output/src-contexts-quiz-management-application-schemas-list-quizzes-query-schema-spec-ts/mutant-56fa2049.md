# Mutant 56fa2049 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 55
**Stable ID**: 56fa2049
**Location**: L48:36–L48:48

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #55
@@ -44,9 +44,9 @@
     describe("Status Field Validation", () => {
       it.each([
         ["single approved status", ["approved"], true],
         ["single pending_approval status", ["pending_approval"], true],
-        ["single rejected status", ["rejected"], true],
+        ["single rejected status", [], true],
         ["multiple valid statuses", ["pending_approval", "approved"], true],
         [
           "all valid statuses",
           ["pending_approval", "approved", "rejected"],
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
