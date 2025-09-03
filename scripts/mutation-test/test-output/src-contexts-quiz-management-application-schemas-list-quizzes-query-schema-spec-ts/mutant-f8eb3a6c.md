# Mutant f8eb3a6c Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 730
**Stable ID**: f8eb3a6c
**Location**: L577:14–L577:48

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #730
@@ -573,9 +573,9 @@
         }
       });
     });
 
-    describe("Real-world Integration Scenarios", () => {
+    describe("", () => {
       it("should handle typical API pagination request", () => {
         const paginationRequest = {
           status: ["approved"],
           limit: 20,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
