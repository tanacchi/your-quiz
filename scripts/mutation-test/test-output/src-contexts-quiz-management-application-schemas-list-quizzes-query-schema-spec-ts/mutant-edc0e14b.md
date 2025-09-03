# Mutant edc0e14b Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 380
**Stable ID**: edc0e14b
**Location**: L228:36–L233:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #380
@@ -224,14 +224,9 @@
         expect(result.success).toBe(false);
       });
 
       it("should allow data with extra fields (schema is not strict)", () => {
-        const dataWithExtraField = {
-          status: ["approved"],
-          limit: 10,
-          offset: 0,
-          extraField: "not allowed",
-        };
+        const dataWithExtraField = {};
         const result = listQuizzesQuerySchema.safeParse(dataWithExtraField);
         expect(result.success).toBe(true); // schema doesn't use .strict()
       });
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
