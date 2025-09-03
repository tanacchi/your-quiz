# Mutant d08c875a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3324
**Stable ID**: d08c875a
**Location**: L45:14–L45:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3324
@@ -41,9 +41,9 @@
         }
       });
     });
 
-    describe("TagId validation", () => {
+    describe("", () => {
       it.each([
         ["valid alphanumeric", "tag-1", true],
         ["valid with numbers", "tag123", true],
         ["valid with underscore", "tag_test", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
