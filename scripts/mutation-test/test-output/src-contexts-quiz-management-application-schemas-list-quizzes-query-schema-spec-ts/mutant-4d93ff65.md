# Mutant 4d93ff65 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 50
**Stable ID**: 4d93ff65
**Location**: L47:44–L47:64

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #50
@@ -43,9 +43,9 @@
 
     describe("Status Field Validation", () => {
       it.each([
         ["single approved status", ["approved"], true],
-        ["single pending_approval status", ["pending_approval"], true],
+        ["single pending_approval status", [], true],
         ["single rejected status", ["rejected"], true],
         ["multiple valid statuses", ["pending_approval", "approved"], true],
         [
           "all valid statuses",
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
