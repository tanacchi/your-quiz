# Mutant 7d2225e6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5309
**Stable ID**: 7d2225e6
**Location**: L346:33–L346:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5309
@@ -342,9 +342,9 @@
         expect(result.success).toBe(true);
       });
 
       it("should accept very long explanation", () => {
-        const longExplanation = "A".repeat(5000);
+        const longExplanation = "".repeat(5000);
         const data = { ...validQuizSummaryData, explanation: longExplanation };
         const result = QuizSummarySchema.safeParse(data);
         expect(result.success).toBe(true);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
