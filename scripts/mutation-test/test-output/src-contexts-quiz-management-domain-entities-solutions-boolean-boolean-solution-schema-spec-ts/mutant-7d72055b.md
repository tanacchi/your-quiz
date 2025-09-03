# Mutant 7d72055b Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5783
**Stable ID**: 7d72055b
**Location**: L64:10–L64:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5783
@@ -60,9 +60,9 @@
           true,
         ],
         ["empty string", "", false],
         ["only whitespace", "   ", true],
-        ["null value", null, false],
+        ["", null, false],
         ["undefined value", undefined, false],
         ["number", 123, false],
         ["object", {}, false],
         ["boolean", true, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
