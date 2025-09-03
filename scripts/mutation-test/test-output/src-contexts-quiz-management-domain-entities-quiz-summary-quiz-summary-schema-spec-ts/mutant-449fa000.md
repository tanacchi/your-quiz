# Mutant 449fa000 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4965
**Stable ID**: 449fa000
**Location**: L40:10–L40:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #4965
@@ -36,9 +36,9 @@
         ["null value", null, false],
         ["undefined value", undefined, false],
         ["number", 123, false],
         ["object", {}, false],
-      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
+      ])("", (_desc, input, isValid) => {
         const result = QuizId.safeParse(input);
         expect(result.success).toBe(isValid);
 
         if (isValid && result.success) {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
