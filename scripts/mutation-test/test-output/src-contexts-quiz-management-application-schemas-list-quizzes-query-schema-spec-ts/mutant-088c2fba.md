# Mutant 088c2fba Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 16
**Stable ID**: 088c2fba
**Location**: L10:55–L238:4

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #16
@@ -6,238 +6,10 @@
   listQuizzesQuerySchema,
 } from "./list-quizzes-query.schema";
 
 describe("List Quizzes Query Schema", () => {
-  describe("listQuizzesQuerySchema Validation", () => {
-    describe("Default Values", () => {
-      it("should apply default values for all optional fields", () => {
-        const emptyInput = {};
-        const result = listQuizzesQuerySchema.safeParse(emptyInput);
-        expect(result.success).toBe(true);
+  describe("listQuizzesQuerySchema Validation", () => {});
 
-        if (result.success) {
-          const data = result.data as ListQuizzesQuery;
-          expect(data.status).toEqual(["approved"]);
-          expect(data.limit).toBe(10);
-          expect(data.offset).toBe(0);
-          expect(data.creatorId).toBeUndefined();
-          expect(data.quizId).toBeUndefined();
-        }
-      });
-
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
-    });
-
-    describe("Status Field Validation", () => {
-      it.each([
-        ["single approved status", ["approved"], true],
-        ["single pending_approval status", ["pending_approval"], true],
-        ["single rejected status", ["rejected"], true],
-        ["multiple valid statuses", ["pending_approval", "approved"], true],
-        [
-          "all valid statuses",
-          ["pending_approval", "approved", "rejected"],
-          true,
-        ],
-        ["duplicate statuses", ["approved", "approved"], true],
-        ["invalid status", ["invalid_status"], false],
-        ["mixed valid and invalid", ["approved", "invalid"], false],
-        ["empty array", [], true], // empty arrays are allowed
-        ["non-array value", "approved", false],
-        ["null value", null, false],
-        ["undefined value", undefined, true], // Should apply default
-      ])("should validate status: %s -> %s", (_desc, status, isValid) => {
-        const input = status === undefined ? {} : { status };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(isValid);
-
-        if (isValid && result.success && status !== undefined) {
-          expect(result.data.status).toEqual(status);
-        }
-      });
-
-      it("should apply default status when undefined", () => {
-        const result = listQuizzesQuerySchema.safeParse({});
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.status).toEqual(["approved"]);
-        }
-      });
-    });
-
-    describe("CreatorId Field Validation", () => {
-      it.each([
-        ["valid single creatorId", "creator-123", true],
-        ["valid UUID format", "550e8400-e29b-41d4-a716-446655440000", true],
-        ["valid alphanumeric", "user123", true],
-        ["empty string", "", false],
-        ["whitespace only", "   ", true], // whitespace-only strings are valid (length > 0)
-        ["array value (should reject)", ["creator-123"], false],
-        ["null value", null, false],
-        ["undefined value", undefined, true],
-      ])("should validate creatorId: %s -> %s", (_desc, creatorId, isValid) => {
-        const input = creatorId === undefined ? {} : { creatorId };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(isValid);
-
-        if (isValid && result.success && creatorId !== undefined) {
-          expect(result.data.creatorId).toEqual(creatorId);
-        }
-      });
-    });
-
-    describe("QuizId Field Validation", () => {
-      it.each([
-        ["valid single quizId", ["quiz-123"], true],
-        ["valid multiple quizIds", ["quiz-1", "quiz-2", "quiz-3"], true],
-        ["valid UUID format", ["550e8400-e29b-41d4-a716-446655440000"], true],
-        ["valid alphanumeric", ["q1"], true],
-        ["empty string in array", [""], false],
-        ["whitespace only", ["   "], true], // whitespace-only strings have length > 0
-        ["mixed valid and empty", ["quiz-1", ""], false],
-        ["empty array", [], true],
-        ["non-array value", "quiz-123", false],
-        ["null value", null, false],
-        ["undefined value", undefined, true],
-      ])("should validate quizId: %s -> %s", (_desc, quizId, isValid) => {
-        const input = quizId === undefined ? {} : { quizId };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(isValid);
-
-        if (isValid && result.success && quizId !== undefined) {
-          expect(result.data.quizId).toEqual(quizId);
-        }
-      });
-    });
-
-    describe("Limit Field Validation", () => {
-      it.each([
-        ["minimum valid limit", 1, true],
-        ["default limit", 10, true],
-        ["moderate limit", 50, true],
-        ["maximum valid limit", 100, true],
-        ["zero limit", 0, false],
-        ["negative limit", -1, false],
-        ["over maximum limit", 101, false],
-        ["decimal number", 10.5, false],
-        ["string number", "10", false],
-        ["null value", null, false],
-        ["undefined value", undefined, true], // Should apply default
-      ])("should validate limit: %s -> %s", (_desc, limit, isValid) => {
-        const input = limit === undefined ? {} : { limit };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(isValid);
-
-        if (isValid && result.success) {
-          if (limit !== undefined) {
-            expect(result.data.limit).toBe(limit);
-          } else {
-            expect(result.data.limit).toBe(10); // default
-          }
-        }
-      });
-
-      it("should apply default limit when undefined", () => {
-        const result = listQuizzesQuerySchema.safeParse({});
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.limit).toBe(10);
-        }
-      });
-    });
-
-    describe("Offset Field Validation", () => {
-      it.each([
-        ["zero offset", 0, true],
-        ["small offset", 10, true],
-        ["large offset", 1000, true],
-        ["very large offset", 999999, true],
-        ["negative offset", -1, false],
-        ["decimal number", 5.5, false],
-        ["string number", "0", false],
-        ["null value", null, false],
-        ["undefined value", undefined, true], // Should apply default
-      ])("should validate offset: %s -> %s", (_desc, offset, isValid) => {
-        const input = offset === undefined ? {} : { offset };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(isValid);
-
-        if (isValid && result.success) {
-          if (offset !== undefined) {
-            expect(result.data.offset).toBe(offset);
-          } else {
-            expect(result.data.offset).toBe(0); // default
-          }
-        }
-      });
-
-      it("should apply default offset when undefined", () => {
-        const result = listQuizzesQuerySchema.safeParse({});
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.offset).toBe(0);
-        }
-      });
-    });
-
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
-  });
-
   describe("listQueryFromReq Transformation Pipeline", () => {
     describe("Raw Input Processing", () => {
       it("should handle empty raw input", () => {
         const rawInput = {};
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
