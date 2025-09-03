# Mutant fad15e91 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5775
**Stable ID**: fad15e91
**Location**: L62:10–L62:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5775
@@ -58,9 +58,9 @@
           "valid long id",
           "solution-very-long-identifier-with-many-parts",
           true,
         ],
-        ["empty string", "", false],
+        ["", "", false],
         ["only whitespace", "   ", true],
         ["null value", null, false],
         ["undefined value", undefined, false],
         ["number", 123, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
