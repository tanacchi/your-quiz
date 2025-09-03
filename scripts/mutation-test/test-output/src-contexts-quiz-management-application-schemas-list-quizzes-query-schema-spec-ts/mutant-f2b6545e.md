# Mutant f2b6545e Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 354
**Stable ID**: f2b6545e
**Location**: L199:52–L237:6

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #354
@@ -195,47 +195,9 @@
         }
       });
     });
 
-    describe("Complex Validation Scenarios", () => {
-      it("should accept valid complete query", () => {
-        const validQuery = {
-          status: ["approved", "pending_approval"],
-          creatorId: "creator-123",
-          quizId: ["quiz-1", "quiz-2", "quiz-3"],
-          limit: 25,
-          offset: 50,
-        };
-        const result = listQuizzesQuerySchema.safeParse(validQuery);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data).toEqual(validQuery);
-        }
-      });
-
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
-
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
-    });
+    describe("Complex Validation Scenarios", () => {});
   });
 
   describe("listQueryFromReq Transformation Pipeline", () => {
     describe("Raw Input Processing", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
