# Mutant f0e57e43 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 487
**Stable ID**: f0e57e43
**Location**: L314:70–L332:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #487
@@ -310,28 +310,10 @@
       );
     });
 
     describe("Pipeline Integration", () => {
-      it("should process realistic HTTP query parameter data", () => {
-        const httpQueryParams = {
-          status: ["approved", "pending_approval"],
-          creatorId: "user-123",
-          limit: "20",
-          offset: "0",
-        };
-        const result = listQueryFromReq.safeParse(httpQueryParams);
-        expect(result.success).toBe(true);
+      it("should process realistic HTTP query parameter data", () => {});
 
-        if (result.success) {
-          expect(result.data.status).toEqual(["approved", "pending_approval"]);
-          expect(result.data.creatorId).toEqual("user-123");
-          expect(result.data.limit).toBe(20);
-          expect(result.data.offset).toBe(0);
-          expect(typeof result.data.limit).toBe("number");
-          expect(typeof result.data.offset).toBe("number");
-        }
-      });
-
       it("should handle mixed valid and invalid data correctly", () => {
         const mixedInput = {
           status: ["approved"], // valid
           creatorId: "", // invalid - empty string
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
