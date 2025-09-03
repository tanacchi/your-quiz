# Mutant e03caf85 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 5336
**Stable ID**: e03caf85
**Location**: L368:15–L374:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5336
@@ -364,15 +364,9 @@
       });
     });
 
     describe("Date Validation", () => {
-      it.each([
-        ["SQLite format", "2023-12-01 10:00:00", true],
-        ["SQLite date only", "2023-12-01", false],
-        ["invalid date", "invalid-date", false],
-        ["empty string", "", false],
-        ["null", null, false],
-      ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
+      it.each([])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
         const data = { ...validQuizSummaryData, createdAt };
         const result = QuizSummarySchema.safeParse(data);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
