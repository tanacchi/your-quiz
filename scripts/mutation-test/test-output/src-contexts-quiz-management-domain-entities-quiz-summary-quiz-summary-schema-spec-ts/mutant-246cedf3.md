# Mutant 246cedf3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5178
**Stable ID**: 246cedf3
**Location**: L170:9–L170:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5178
@@ -166,9 +166,9 @@
         ["invalid type", "invalid_type", false],
         ["empty string", "", false],
         ["null value", null, false],
       ])(
-        "should validate answerType: %s -> %s",
+        "",
         (_desc, answerType, isValid) => {
           const data = { ...validQuizSummaryData, answerType };
           const result = QuizSummarySchema.safeParse(data);
           expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
