# Mutant 79cef8e3 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 719
**Stable ID**: 79cef8e3
**Location**: L561:10–L561:50

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #719
@@ -557,9 +557,9 @@
           expect(typeof data.offset).toBe("number");
         }
       });
 
-      it("should work with partial input objects", () => {
+      it("", () => {
         const partialInput: Partial<ListQuizzesQuery> = {
           status: ["pending_approval"],
           limit: 5,
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
