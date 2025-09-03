# Mutant ba814ae9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5378
**Stable ID**: ba814ae9
**Location**: L400:27–L404:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5378
@@ -396,13 +396,9 @@
 
       const result = QuizSummarySchema.safeParse(fullApprovedQuiz);
       expect(result.success).toBe(true);
 
-      if (result.success) {
-        expect(result.data.tagIds).toHaveLength(3);
-        expect(result.data.status).toBe("approved");
-        expect(result.data.approvedAt).toBeDefined();
-      }
+      if (result.success) {}
     });
 
     it("should handle minimal valid quiz", () => {
       const minimalQuiz = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
