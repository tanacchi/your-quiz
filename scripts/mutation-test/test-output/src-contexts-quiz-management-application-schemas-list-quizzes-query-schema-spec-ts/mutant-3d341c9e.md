# Mutant 3d341c9e Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 636
**Stable ID**: 3d341c9e
**Location**: L456:74–L469:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #636
@@ -452,23 +452,10 @@
   });
 
   describe("Error Handling and Validation Messages", () => {
     describe("Detailed Error Information", () => {
-      it("should provide specific error paths for invalid status", () => {
-        const input = { status: ["invalid_status"] };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(false);
+      it("should provide specific error paths for invalid status", () => {});
 
-        if (!result.success) {
-          const error = result.error as ZodError;
-          const statusError = error.issues.find((issue) =>
-            issue.path.includes("status"),
-          );
-          expect(statusError).toBeDefined();
-          expect(statusError?.code).toBe("invalid_value");
-        }
-      });
-
       it("should provide specific error paths for invalid limit", () => {
         const input = { limit: 0 };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(false);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
