# Mutant 64c200a1 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6073
**Stable ID**: 64c200a1
**Location**: L323:9–L323:17

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6073
@@ -319,9 +319,9 @@
     it("should handle completely invalid input types", () => {
       const invalidInputs = [
         null,
         undefined,
-        "string",
+        "",
         123,
         true,
         [],
         () => {},
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
