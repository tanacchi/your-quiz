# Mutant bef88d82 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5786
**Stable ID**: bef88d82
**Location**: L65:10–L65:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5786
@@ -61,9 +61,9 @@
         ],
         ["empty string", "", false],
         ["only whitespace", "   ", true],
         ["null value", null, false],
-        ["undefined value", undefined, false],
+        ["", undefined, false],
         ["number", 123, false],
         ["object", {}, false],
         ["boolean", true, false],
       ])("should validate id: %s -> %s", (_desc, id, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
