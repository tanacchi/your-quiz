# Mutant 724db073 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2929
**Stable ID**: 724db073
**Location**: L131:9–L131:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2929
@@ -127,9 +127,9 @@
         }
       });
 
       it.each([
-        ["single_choice", "single_choice"],
+        [],
         ["multiple_choice", "multiple_choice"],
         ["free_text", "free_text"],
         ["invalid_type", "invalid_type"],
         ["", ""],
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
