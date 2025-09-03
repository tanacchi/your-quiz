# Mutant 07cbcfcc Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 103
**Stable ID**: 07cbcfcc
**Location**: L62:74–L70:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #103
@@ -58,18 +58,10 @@
         ["empty array", [], true], // empty arrays are allowed
         ["non-array value", "approved", false],
         ["null value", null, false],
         ["undefined value", undefined, true], // Should apply default
-      ])("should validate status: %s -> %s", (_desc, status, isValid) => {
-        const input = status === undefined ? {} : { status };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(isValid);
+      ])("should validate status: %s -> %s", (_desc, status, isValid) => {});
 
-        if (isValid && result.success && status !== undefined) {
-          expect(result.data.status).toEqual(status);
-        }
-      });
-
       it("should apply default status when undefined", () => {
         const result = listQuizzesQuerySchema.safeParse({});
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
