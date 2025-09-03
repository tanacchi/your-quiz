# Mutant 094f3ef5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2934
**Stable ID**: 094f3ef5
**Location**: L132:29–L132:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2934
@@ -128,9 +128,9 @@
       });
 
       it.each([
         ["single_choice", "single_choice"],
-        ["multiple_choice", "multiple_choice"],
+        ["multiple_choice", ""],
         ["free_text", "free_text"],
         ["invalid_type", "invalid_type"],
         ["", ""],
         [null, null],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
