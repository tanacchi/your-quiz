# Mutant 2cc78e16 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 732
**Stable ID**: 2cc78e16
**Location**: L578:10–L578:56

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #732
@@ -574,9 +574,9 @@
       });
     });
 
     describe("Real-world Integration Scenarios", () => {
-      it("should handle typical API pagination request", () => {
+      it("", () => {
         const paginationRequest = {
           status: ["approved"],
           limit: 20,
           offset: 40, // page 3 with limit 20
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
