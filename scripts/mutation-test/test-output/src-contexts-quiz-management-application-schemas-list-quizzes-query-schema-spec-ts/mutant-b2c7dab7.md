# Mutant b2c7dab7 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 484
**Stable ID**: b2c7dab7
**Location**: L313:14–L313:36

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #484
@@ -309,9 +309,9 @@
         },
       );
     });
 
-    describe("Pipeline Integration", () => {
+    describe("", () => {
       it("should process realistic HTTP query parameter data", () => {
         const httpQueryParams = {
           status: ["approved", "pending_approval"],
           creatorId: "user-123",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
