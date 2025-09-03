# Mutant 4b033bcd Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 486
**Stable ID**: 4b033bcd
**Location**: L314:10–L314:62

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #486
@@ -310,9 +310,9 @@
       );
     });
 
     describe("Pipeline Integration", () => {
-      it("should process realistic HTTP query parameter data", () => {
+      it("", () => {
         const httpQueryParams = {
           status: ["approved", "pending_approval"],
           creatorId: "user-123",
           limit: "20",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
