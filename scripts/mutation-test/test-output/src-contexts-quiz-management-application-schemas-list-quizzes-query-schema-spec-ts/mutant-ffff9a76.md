# Mutant ffff9a76 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 44
**Stable ID**: ffff9a76
**Location**: L46:10–L46:34

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #44
@@ -42,9 +42,9 @@
     });
 
     describe("Status Field Validation", () => {
       it.each([
-        ["single approved status", ["approved"], true],
+        ["", ["approved"], true],
         ["single pending_approval status", ["pending_approval"], true],
         ["single rejected status", ["rejected"], true],
         ["multiple valid statuses", ["pending_approval", "approved"], true],
         [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
