# Mutant cd30225a Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 731
**Stable ID**: cd30225a
**Location**: L577:56–L620:6

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #731
@@ -573,53 +573,10 @@
         }
       });
     });
 
-    describe("Real-world Integration Scenarios", () => {
-      it("should handle typical API pagination request", () => {
-        const paginationRequest = {
-          status: ["approved"],
-          limit: 20,
-          offset: 40, // page 3 with limit 20
-        };
-        const result = listQuizzesQuerySchema.safeParse(paginationRequest);
-        expect(result.success).toBe(true);
+    describe("Real-world Integration Scenarios", () => {});
 
-        if (result.success) {
-          expect(result.data.limit).toBe(20);
-          expect(result.data.offset).toBe(40);
-        }
-      });
-
-      it("should handle filtering by single creator", () => {
-        const singleCreatorRequest = {
-          status: ["approved", "pending_approval"],
-          creatorId: "teacher-1",
-          limit: 50,
-        };
-        const result = listQuizzesQuerySchema.safeParse(singleCreatorRequest);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.creatorId).toBe("teacher-1");
-          expect(result.data.status).toHaveLength(2);
-        }
-      });
-
-      it("should handle quiz-specific filtering", () => {
-        const specificQuizRequest = {
-          quizId: ["quiz-abc123", "quiz-def456"],
-          status: ["approved"],
-        };
-        const result = listQuizzesQuerySchema.safeParse(specificQuizRequest);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.quizId).toEqual(["quiz-abc123", "quiz-def456"]);
-        }
-      });
-    });
-
     describe("Performance and Memory", () => {
       it("should handle validation performance within reasonable time", () => {
         const startTime = performance.now();
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
