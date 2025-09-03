# Mutant 173b381e Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 117
**Stable ID**: 173b381e
**Location**: L72:62–L79:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #117
@@ -68,16 +68,9 @@
           expect(result.data.status).toEqual(status);
         }
       });
 
-      it("should apply default status when undefined", () => {
-        const result = listQuizzesQuerySchema.safeParse({});
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.status).toEqual(["approved"]);
-        }
-      });
+      it("should apply default status when undefined", () => {});
     });
 
     describe("CreatorId Field Validation", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
