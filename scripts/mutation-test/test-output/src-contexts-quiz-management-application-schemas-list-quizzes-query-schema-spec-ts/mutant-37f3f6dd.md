# Mutant 37f3f6dd Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 27
**Stable ID**: 37f3f6dd
**Location**: L27:10–L27:57

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #27
@@ -23,9 +23,9 @@
           expect(data.quizId).toBeUndefined();
         }
       });
 
-      it("should preserve provided values over defaults", () => {
+      it("", () => {
         const customInput = {
           status: ["pending_approval", "rejected"],
           limit: 25,
           offset: 50,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
