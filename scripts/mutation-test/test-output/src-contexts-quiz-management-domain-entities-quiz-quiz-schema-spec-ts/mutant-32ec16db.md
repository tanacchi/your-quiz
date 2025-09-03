# Mutant 32ec16db Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2932
**Stable ID**: 32ec16db
**Location**: L132:9–L132:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2932
@@ -128,9 +128,9 @@
       });
 
       it.each([
         ["single_choice", "single_choice"],
-        ["multiple_choice", "multiple_choice"],
+        [],
         ["free_text", "free_text"],
         ["invalid_type", "invalid_type"],
         ["", ""],
         [null, null],
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
