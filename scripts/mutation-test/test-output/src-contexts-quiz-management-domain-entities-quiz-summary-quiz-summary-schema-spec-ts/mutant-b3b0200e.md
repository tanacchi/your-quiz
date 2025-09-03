# Mutant b3b0200e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5308
**Stable ID**: b3b0200e
**Location**: L345:55–L350:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5308
@@ -341,14 +341,9 @@
         const result = QuizSummarySchema.safeParse(data);
         expect(result.success).toBe(true);
       });
 
-      it("should accept very long explanation", () => {
-        const longExplanation = "A".repeat(5000);
-        const data = { ...validQuizSummaryData, explanation: longExplanation };
-        const result = QuizSummarySchema.safeParse(data);
-        expect(result.success).toBe(true);
-      });
+      it("should accept very long explanation", () => {});
     });
 
     describe("Special Characters", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
