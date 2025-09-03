# Mutant 08127c2f Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 40
**Stable ID**: 08127c2f
**Location**: L44:14–L44:39

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #40
@@ -40,9 +40,9 @@
         }
       });
     });
 
-    describe("Status Field Validation", () => {
+    describe("", () => {
       it.each([
         ["single approved status", ["approved"], true],
         ["single pending_approval status", ["pending_approval"], true],
         ["single rejected status", ["rejected"], true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
