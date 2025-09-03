# Mutant c3140da3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5179
**Stable ID**: c3140da3
**Location**: L171:41–L175:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5179
@@ -167,13 +167,9 @@
         ["empty string", "", false],
         ["null value", null, false],
       ])(
         "should validate answerType: %s -> %s",
-        (_desc, answerType, isValid) => {
-          const data = { ...validQuizSummaryData, answerType };
-          const result = QuizSummarySchema.safeParse(data);
-          expect(result.success).toBe(isValid);
-        },
+        (_desc, answerType, isValid) => {},
       );
     });
 
     describe("Status Field", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
