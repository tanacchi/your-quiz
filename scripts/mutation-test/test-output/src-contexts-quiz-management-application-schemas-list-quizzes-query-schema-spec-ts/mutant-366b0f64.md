# Mutant 366b0f64 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 125
**Stable ID**: 366b0f64
**Location**: L82:50–L101:6

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #125
@@ -78,29 +78,10 @@
         }
       });
     });
 
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
+    describe("CreatorId Field Validation", () => {});
 
-        if (isValid && result.success && creatorId !== undefined) {
-          expect(result.data.creatorId).toEqual(creatorId);
-        }
-      });
-    });
-
     describe("QuizId Field Validation", () => {
       it.each([
         ["valid single quizId", ["quiz-123"], true],
         ["valid multiple quizIds", ["quiz-1", "quiz-2", "quiz-3"], true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
