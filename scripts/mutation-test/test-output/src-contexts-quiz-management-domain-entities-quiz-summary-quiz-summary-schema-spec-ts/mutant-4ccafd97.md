# Mutant 4ccafd97 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5293
**Stable ID**: 4ccafd97
**Location**: L325:47–L332:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5293
@@ -321,16 +321,9 @@
         const result = QuizSummarySchema.safeParse(dataWithEmptyTagIds);
         expect(result.success).toBe(true);
       });
 
-      it("should accept single tag ID", () => {
-        const dataWithSingleTagId = {
-          ...validQuizSummaryData,
-          tagIds: ["tag-1"],
-        };
-        const result = QuizSummarySchema.safeParse(dataWithSingleTagId);
-        expect(result.success).toBe(true);
-      });
+      it("should accept single tag ID", () => {});
     });
   });
 
   describe("Edge Cases and Boundary Values", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
