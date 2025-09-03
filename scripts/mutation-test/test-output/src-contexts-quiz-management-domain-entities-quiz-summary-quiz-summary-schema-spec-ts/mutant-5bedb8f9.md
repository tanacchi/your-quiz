# Mutant 5bedb8f9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5219
**Stable ID**: 5bedb8f9
**Location**: L209:53–L217:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5219
@@ -205,17 +205,9 @@
         const result = QuizSummarySchema.safeParse(dataWithoutApprovedAt);
         expect(result.success).toBe(true);
       });
 
-      it("should accept data without tagIds", () => {
-        const { tagIds: _tagIds, ...dataWithoutTagIds } = validQuizSummaryData;
-        const result = QuizSummarySchema.safeParse(dataWithoutTagIds);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.tagIds).toEqual([]);
-        }
-      });
+      it("should accept data without tagIds", () => {});
     });
 
     describe("Strict Mode", () => {
       it("should reject data with extra fields", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
