# Mutant 9a96199e Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 379
**Stable ID**: 9a96199e
**Location**: L227:78–L236:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #379
@@ -223,18 +223,9 @@
         const result = listQuizzesQuerySchema.safeParse(invalidQuery);
         expect(result.success).toBe(false);
       });
 
-      it("should allow data with extra fields (schema is not strict)", () => {
-        const dataWithExtraField = {
-          status: ["approved"],
-          limit: 10,
-          offset: 0,
-          extraField: "not allowed",
-        };
-        const result = listQuizzesQuerySchema.safeParse(dataWithExtraField);
-        expect(result.success).toBe(true); // schema doesn't use .strict()
-      });
+      it("should allow data with extra fields (schema is not strict)", () => {});
     });
   });
 
   describe("listQueryFromReq Transformation Pipeline", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
