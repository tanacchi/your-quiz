# Mutant fa5a1b49 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 353
**Stable ID**: fa5a1b49
**Location**: L199:14–L199:44

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #353
@@ -195,9 +195,9 @@
         }
       });
     });
 
-    describe("Complex Validation Scenarios", () => {
+    describe("", () => {
       it("should accept valid complete query", () => {
         const validQuery = {
           status: ["approved", "pending_approval"],
           creatorId: "creator-123",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
