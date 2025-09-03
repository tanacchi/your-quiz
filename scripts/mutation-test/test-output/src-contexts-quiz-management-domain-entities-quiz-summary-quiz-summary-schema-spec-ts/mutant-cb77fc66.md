# Mutant cb77fc66 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5223
**Stable ID**: cb77fc66
**Location**: L214:29–L216:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5223
@@ -210,11 +210,9 @@
         const { tagIds: _tagIds, ...dataWithoutTagIds } = validQuizSummaryData;
         const result = QuizSummarySchema.safeParse(dataWithoutTagIds);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.tagIds).toEqual([]);
-        }
+        if (result.success) {}
       });
     });
 
     describe("Strict Mode", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
