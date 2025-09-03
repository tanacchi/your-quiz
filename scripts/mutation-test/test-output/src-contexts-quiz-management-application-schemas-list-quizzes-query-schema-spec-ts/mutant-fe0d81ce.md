# Mutant fe0d81ce Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 485
**Stable ID**: fe0d81ce
**Location**: L313:44–L360:6

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #485
@@ -309,56 +309,9 @@
         },
       );
     });
 
-    describe("Pipeline Integration", () => {
-      it("should process realistic HTTP query parameter data", () => {
-        const httpQueryParams = {
-          status: ["approved", "pending_approval"],
-          creatorId: "user-123",
-          limit: "20",
-          offset: "0",
-        };
-        const result = listQueryFromReq.safeParse(httpQueryParams);
-        expect(result.success).toBe(true);
-
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
-      it("should handle mixed valid and invalid data correctly", () => {
-        const mixedInput = {
-          status: ["approved"], // valid
-          creatorId: "", // invalid - empty string
-          limit: "15", // valid
-          offset: "-5", // invalid - negative
-        };
-        const result = listQueryFromReq.safeParse(mixedInput);
-        expect(result.success).toBe(false);
-      });
-
-      it("should preserve type safety through transformation", () => {
-        const typedInput = {
-          status: ["approved"] as const,
-          limit: "50",
-          offset: "0",
-        };
-        const result = listQueryFromReq.safeParse(typedInput);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(Array.isArray(result.data.status)).toBe(true);
-          expect(typeof result.data.limit).toBe("number");
-          expect(typeof result.data.offset).toBe("number");
-        }
-      });
-    });
+    describe("Pipeline Integration", () => {});
   });
 
   describe("Boundary Values and Edge Cases", () => {
     describe("Limit Boundary Testing", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
