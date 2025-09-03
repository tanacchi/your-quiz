# Mutant ffa7537e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2931
**Stable ID**: ffa7537e
**Location**: L131:27–L131:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2931
@@ -127,9 +127,9 @@
         }
       });
 
       it.each([
-        ["single_choice", "single_choice"],
+        ["single_choice", ""],
         ["multiple_choice", "multiple_choice"],
         ["free_text", "free_text"],
         ["invalid_type", "invalid_type"],
         ["", ""],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
