# Mutant 333b315b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5264
**Stable ID**: 333b315b
**Location**: L287:48–L294:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5264
@@ -283,16 +283,9 @@
       });
     });
 
     describe("Duplicate TagIds Validation", () => {
-      it("should accept unique tag IDs", () => {
-        const dataWithUniqueTagIds = {
-          ...validQuizSummaryData,
-          tagIds: ["tag-1", "tag-2", "tag-3"],
-        };
-        const result = QuizSummarySchema.safeParse(dataWithUniqueTagIds);
-        expect(result.success).toBe(true);
-      });
+      it("should accept unique tag IDs", () => {});
 
       it("should reject duplicate tag IDs", () => {
         const dataWithDuplicateTagIds = {
           ...validQuizSummaryData,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
