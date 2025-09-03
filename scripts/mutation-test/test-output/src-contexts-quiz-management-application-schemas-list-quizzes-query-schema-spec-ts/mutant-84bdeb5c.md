# Mutant 84bdeb5c Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 28
**Stable ID**: 84bdeb5c
**Location**: L27:65–L41:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #28
@@ -23,23 +23,9 @@
           expect(data.quizId).toBeUndefined();
         }
       });
 
-      it("should preserve provided values over defaults", () => {
-        const customInput = {
-          status: ["pending_approval", "rejected"],
-          limit: 25,
-          offset: 50,
-        };
-        const result = listQuizzesQuerySchema.safeParse(customInput);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.status).toEqual(["pending_approval", "rejected"]);
-          expect(result.data.limit).toBe(25);
-          expect(result.data.offset).toBe(50);
-        }
-      });
+      it("should preserve provided values over defaults", () => {});
     });
 
     describe("Status Field Validation", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
