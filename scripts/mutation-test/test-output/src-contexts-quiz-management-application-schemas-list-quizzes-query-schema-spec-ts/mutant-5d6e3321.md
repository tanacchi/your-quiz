# Mutant 5d6e3321 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 280
**Stable ID**: 5d6e3321
**Location**: L140:72–L152:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #280
@@ -136,22 +136,10 @@
         ["decimal number", 10.5, false],
         ["string number", "10", false],
         ["null value", null, false],
         ["undefined value", undefined, true], // Should apply default
-      ])("should validate limit: %s -> %s", (_desc, limit, isValid) => {
-        const input = limit === undefined ? {} : { limit };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(isValid);
+      ])("should validate limit: %s -> %s", (_desc, limit, isValid) => {});
 
-        if (isValid && result.success) {
-          if (limit !== undefined) {
-            expect(result.data.limit).toBe(limit);
-          } else {
-            expect(result.data.limit).toBe(10); // default
-          }
-        }
-      });
-
       it("should apply default limit when undefined", () => {
         const result = listQuizzesQuerySchema.safeParse({});
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
