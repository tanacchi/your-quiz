# Mutant c34c022e Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 398
**Stable ID**: c34c022e
**Location**: L254:60–L268:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #398
@@ -250,24 +250,10 @@
           expect(result.data.offset).toBe(0);
         }
       });
 
-      it("should transform string arrays correctly", () => {
-        const rawInput = {
-          status: ["pending_approval", "approved"],
-          creatorId: "creator-123",
-          quizId: ["quiz-1"],
-        };
-        const result = listQueryFromReq.safeParse(rawInput);
-        expect(result.success).toBe(true);
+      it("should transform string arrays correctly", () => {});
 
-        if (result.success) {
-          expect(result.data.status).toEqual(["pending_approval", "approved"]);
-          expect(result.data.creatorId).toEqual("creator-123");
-          expect(result.data.quizId).toEqual(["quiz-1"]);
-        }
-      });
-
       it("should coerce string numbers to integers", () => {
         const rawInput = {
           limit: "25",
           offset: "100",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
