# Mutant acebfbb1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4963
**Stable ID**: acebfbb1
**Location**: L39:10–L39:18

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #4963
@@ -35,9 +35,9 @@
         ["only whitespace", "   ", true],
         ["null value", null, false],
         ["undefined value", undefined, false],
         ["number", 123, false],
-        ["object", {}, false],
+        ["", {}, false],
       ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
         const result = QuizId.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
