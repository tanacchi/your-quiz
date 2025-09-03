# Mutant 2cb6f9b2 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 370
**Stable ID**: 2cb6f9b2
**Location**: L216:10–L216:52

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #370
@@ -212,9 +212,9 @@
           expect(result.data).toEqual(validQuery);
         }
       });
 
-      it("should reject invalid field combinations", () => {
+      it("", () => {
         const invalidQuery = {
           status: ["invalid_status"],
           creatorId: "", // empty string not allowed
           limit: 0, // below minimum
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
