# Mutant 418c886c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5335
**Stable ID**: 418c886c
**Location**: L367:39–L379:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5335
@@ -363,21 +363,9 @@
         expect(result.success).toBe(true);
       });
     });
 
-    describe("Date Validation", () => {
-      it.each([
-        ["SQLite format", "2023-12-01 10:00:00", true],
-        ["SQLite date only", "2023-12-01", false],
-        ["invalid date", "invalid-date", false],
-        ["empty string", "", false],
-        ["null", null, false],
-      ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
-        const data = { ...validQuizSummaryData, createdAt };
-        const result = QuizSummarySchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-      });
-    });
+    describe("Date Validation", () => {});
   });
 
   describe("Complex Integration Scenarios", () => {
     it("should handle approved quiz with all fields", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
