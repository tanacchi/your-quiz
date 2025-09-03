# Mutant 57c5a890 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 371
**Stable ID**: 57c5a890
**Location**: L216:60–L225:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #371
@@ -212,18 +212,9 @@
           expect(result.data).toEqual(validQuery);
         }
       });
 
-      it("should reject invalid field combinations", () => {
-        const invalidQuery = {
-          status: ["invalid_status"],
-          creatorId: "", // empty string not allowed
-          limit: 0, // below minimum
-          offset: -1, // negative not allowed
-        };
-        const result = listQuizzesQuerySchema.safeParse(invalidQuery);
-        expect(result.success).toBe(false);
-      });
+      it("should reject invalid field combinations", () => {});
 
       it("should allow data with extra fields (schema is not strict)", () => {
         const dataWithExtraField = {
           status: ["approved"],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
