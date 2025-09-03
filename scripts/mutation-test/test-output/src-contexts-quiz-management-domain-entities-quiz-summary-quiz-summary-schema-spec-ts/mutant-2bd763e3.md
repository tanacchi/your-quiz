# Mutant 2bd763e3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5391
**Stable ID**: 2bd763e3
**Location**: L421:27–L425:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5391
@@ -417,12 +417,8 @@
 
       const result = QuizSummarySchema.safeParse(minimalQuiz);
       expect(result.success).toBe(true);
 
-      if (result.success) {
-        expect(result.data.tagIds).toEqual([]);
-        expect(result.data.explanation).toBeUndefined();
-        expect(result.data.approvedAt).toBeUndefined();
-      }
+      if (result.success) {}
     });
   });
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
