# Mutant aa1e7eb2 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 386
**Stable ID**: aa1e7eb2
**Location**: L240:62–L361:4

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #386
@@ -236,131 +236,10 @@
       });
     });
   });
 
-  describe("listQueryFromReq Transformation Pipeline", () => {
-    describe("Raw Input Processing", () => {
-      it("should handle empty raw input", () => {
-        const rawInput = {};
-        const result = listQueryFromReq.safeParse(rawInput);
-        expect(result.success).toBe(true);
+  describe("listQueryFromReq Transformation Pipeline", () => {});
 
-        if (result.success) {
-          expect(result.data.status).toEqual(["approved"]);
-          expect(result.data.limit).toBe(10);
-          expect(result.data.offset).toBe(0);
-        }
-      });
-
-      it("should transform string arrays correctly", () => {
-        const rawInput = {
-          status: ["pending_approval", "approved"],
-          creatorId: "creator-123",
-          quizId: ["quiz-1"],
-        };
-        const result = listQueryFromReq.safeParse(rawInput);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.status).toEqual(["pending_approval", "approved"]);
-          expect(result.data.creatorId).toEqual("creator-123");
-          expect(result.data.quizId).toEqual(["quiz-1"]);
-        }
-      });
-
-      it("should coerce string numbers to integers", () => {
-        const rawInput = {
-          limit: "25",
-          offset: "100",
-        };
-        const result = listQueryFromReq.safeParse(rawInput);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.limit).toBe(25);
-          expect(result.data.offset).toBe(100);
-          expect(typeof result.data.limit).toBe("number");
-          expect(typeof result.data.offset).toBe("number");
-        }
-      });
-
-      it.each([
-        ["valid limit string", { limit: "50" }, 50, true],
-        ["valid offset string", { offset: "25" }, 25, true],
-        ["decimal limit string", { limit: "10.5" }, 10.5, false], // coerces to number but fails int validation
-        ["decimal offset string", { offset: "5.9" }, 5.9, false], // coerces to number but fails int validation
-        ["invalid limit string", { limit: "abc" }, NaN, false],
-        ["invalid offset string", { offset: "xyz" }, NaN, false],
-        ["negative limit string", { limit: "-5" }, -5, false],
-        ["negative offset string", { offset: "-1" }, -1, false],
-      ])(
-        "should handle numeric coercion: %s",
-        (_desc, input, expected, isValid) => {
-          const result = listQueryFromReq.safeParse(input);
-          expect(result.success).toBe(isValid);
-
-          if (isValid && result.success) {
-            if ("limit" in input) {
-              expect(result.data.limit).toBe(expected);
-            }
-            if ("offset" in input) {
-              expect(result.data.offset).toBe(expected);
-            }
-          }
-        },
-      );
-    });
-
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
-  });
-
   describe("Boundary Values and Edge Cases", () => {
     describe("Limit Boundary Testing", () => {
       it.each([
         ["minimum boundary - 1", 1, true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
