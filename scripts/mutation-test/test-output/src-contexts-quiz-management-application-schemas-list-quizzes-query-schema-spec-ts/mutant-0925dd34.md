# Mutant 0925dd34 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 374
**Stable ID**: 0925dd34
**Location**: L218:20–L218:36

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #374
@@ -214,9 +214,9 @@
       });
 
       it("should reject invalid field combinations", () => {
         const invalidQuery = {
-          status: ["invalid_status"],
+          status: [""],
           creatorId: "", // empty string not allowed
           limit: 0, // below minimum
           offset: -1, // negative not allowed
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
