# Mutant 3739f4aa Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 41
**Stable ID**: 3739f4aa
**Location**: L44:47–L80:6

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #41
@@ -40,46 +40,10 @@
         }
       });
     });
 
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
+    describe("Status Field Validation", () => {});
 
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
     describe("CreatorId Field Validation", () => {
       it.each([
         ["valid single creatorId", "creator-123", true],
         ["valid UUID format", "550e8400-e29b-41d4-a716-446655440000", true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
