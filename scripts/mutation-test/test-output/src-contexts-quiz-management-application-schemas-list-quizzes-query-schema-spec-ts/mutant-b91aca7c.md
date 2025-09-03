# Mutant b91aca7c Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 49
**Stable ID**: b91aca7c
**Location**: L47:10–L47:42

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #49
@@ -43,9 +43,9 @@
 
     describe("Status Field Validation", () => {
       it.each([
         ["single approved status", ["approved"], true],
-        ["single pending_approval status", ["pending_approval"], true],
+        ["", ["pending_approval"], true],
         ["single rejected status", ["rejected"], true],
         ["multiple valid statuses", ["pending_approval", "approved"], true],
         [
           "all valid statuses",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
