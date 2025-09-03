# Mutant 1e30f4b1 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 606
**Stable ID**: 1e30f4b1
**Location**: L435:14–L435:46

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #606
@@ -431,9 +431,9 @@
         }
       });
     });
 
-    describe("Special Characters and Unicode", () => {
+    describe("", () => {
       it.each([
         ["special characters", "creator-!@#$%"],
         ["unicode characters", "creator-プログラミング"],
         ["emoji", "creator-🚀"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
