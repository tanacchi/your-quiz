# Mutant 9b1a0293 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 720
**Stable ID**: 9b1a0293
**Location**: L561:58–L574:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #720
@@ -557,22 +557,9 @@
           expect(typeof data.offset).toBe("number");
         }
       });
 
-      it("should work with partial input objects", () => {
-        const partialInput: Partial<ListQuizzesQuery> = {
-          status: ["pending_approval"],
-          limit: 5,
-        };
-        const result = listQuizzesQuerySchema.safeParse(partialInput);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.status).toEqual(["pending_approval"]);
-          expect(result.data.limit).toBe(5);
-          expect(result.data.offset).toBe(0); // default
-        }
-      });
+      it("should work with partial input objects", () => {});
     });
 
     describe("Real-world Integration Scenarios", () => {
       it("should handle typical API pagination request", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
