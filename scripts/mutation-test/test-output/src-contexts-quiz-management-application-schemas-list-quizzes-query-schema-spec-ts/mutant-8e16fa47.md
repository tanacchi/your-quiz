# Mutant 8e16fa47 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 42
**Stable ID**: 8e16fa47
**Location**: L45:15–L62:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #42
@@ -41,26 +41,9 @@
       });
     });
 
     describe("Status Field Validation", () => {
-      it.each([
-        ["single approved status", ["approved"], true],
-        ["single pending_approval status", ["pending_approval"], true],
-        ["single rejected status", ["rejected"], true],
-        ["multiple valid statuses", ["pending_approval", "approved"], true],
-        [
-          "all valid statuses",
-          ["pending_approval", "approved", "rejected"],
-          true,
-        ],
-        ["duplicate statuses", ["approved", "approved"], true],
-        ["invalid status", ["invalid_status"], false],
-        ["mixed valid and invalid", ["approved", "invalid"], false],
-        ["empty array", [], true], // empty arrays are allowed
-        ["non-array value", "approved", false],
-        ["null value", null, false],
-        ["undefined value", undefined, true], // Should apply default
-      ])("should validate status: %s -> %s", (_desc, status, isValid) => {
+      it.each([])("should validate status: %s -> %s", (_desc, status, isValid) => {
         const input = status === undefined ? {} : { status };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
