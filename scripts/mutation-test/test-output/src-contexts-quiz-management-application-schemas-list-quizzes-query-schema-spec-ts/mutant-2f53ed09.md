# Mutant 2f53ed09 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 390
**Stable ID**: 2f53ed09
**Location**: L242:49–L252:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #390
@@ -238,20 +238,10 @@
   });
 
   describe("listQueryFromReq Transformation Pipeline", () => {
     describe("Raw Input Processing", () => {
-      it("should handle empty raw input", () => {
-        const rawInput = {};
-        const result = listQueryFromReq.safeParse(rawInput);
-        expect(result.success).toBe(true);
+      it("should handle empty raw input", () => {});
 
-        if (result.success) {
-          expect(result.data.status).toEqual(["approved"]);
-          expect(result.data.limit).toBe(10);
-          expect(result.data.offset).toBe(0);
-        }
-      });
-
       it("should transform string arrays correctly", () => {
         const rawInput = {
           status: ["pending_approval", "approved"],
           creatorId: "creator-123",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
