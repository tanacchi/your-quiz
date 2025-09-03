# Mutant 0632cb33 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 397
**Stable ID**: 0632cb33
**Location**: L254:10–L254:52

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #397
@@ -250,9 +250,9 @@
           expect(result.data.offset).toBe(0);
         }
       });
 
-      it("should transform string arrays correctly", () => {
+      it("", () => {
         const rawInput = {
           status: ["pending_approval", "approved"],
           creatorId: "creator-123",
           quizId: ["quiz-1"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
