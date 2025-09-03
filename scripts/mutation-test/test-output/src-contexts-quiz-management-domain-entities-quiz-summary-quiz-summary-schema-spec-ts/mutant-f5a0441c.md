# Mutant f5a0441c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5211
**Stable ID**: f5a0441c
**Location**: L194:39–L218:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5211
@@ -190,34 +190,10 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("Optional Fields", () => {
-      it("should accept data without explanation", () => {
-        const { explanation: _explanation, ...dataWithoutExplanation } =
-          validQuizSummaryData;
-        const result = QuizSummarySchema.safeParse(dataWithoutExplanation);
-        expect(result.success).toBe(true);
-      });
+    describe("Optional Fields", () => {});
 
-      it("should accept data without approvedAt", () => {
-        const { approvedAt: _approvedAt, ...dataWithoutApprovedAt } =
-          validQuizSummaryData;
-        const result = QuizSummarySchema.safeParse(dataWithoutApprovedAt);
-        expect(result.success).toBe(true);
-      });
-
-      it("should accept data without tagIds", () => {
-        const { tagIds: _tagIds, ...dataWithoutTagIds } = validQuizSummaryData;
-        const result = QuizSummarySchema.safeParse(dataWithoutTagIds);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.tagIds).toEqual([]);
-        }
-      });
-    });
-
     describe("Strict Mode", () => {
       it("should reject data with extra fields", () => {
         const dataWithExtraField = {
           ...validQuizSummaryData,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
