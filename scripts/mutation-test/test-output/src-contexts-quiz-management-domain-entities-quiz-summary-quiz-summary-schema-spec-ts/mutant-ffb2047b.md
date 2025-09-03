# Mutant ffb2047b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5208
**Stable ID**: ffb2047b
**Location**: L187:74–L191:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5208
@@ -183,13 +183,9 @@
         ["rejected", "rejected", true],
         ["invalid status", "invalid_status", false],
         ["empty string", "", false],
         ["null value", null, false],
-      ])("should validate status: %s -> %s", (_desc, status, isValid) => {
-        const data = { ...validQuizSummaryData, status };
-        const result = QuizSummarySchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-      });
+      ])("should validate status: %s -> %s", (_desc, status, isValid) => {});
     });
 
     describe("Optional Fields", () => {
       it("should accept data without explanation", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
