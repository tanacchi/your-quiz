# Mutant 1c7cdd6c Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 159
**Stable ID**: 1c7cdd6c
**Location**: L92:80–L100:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #159
@@ -88,17 +88,9 @@
         ["whitespace only", "   ", true], // whitespace-only strings are valid (length > 0)
         ["array value (should reject)", ["creator-123"], false],
         ["null value", null, false],
         ["undefined value", undefined, true],
-      ])("should validate creatorId: %s -> %s", (_desc, creatorId, isValid) => {
-        const input = creatorId === undefined ? {} : { creatorId };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(isValid);
-
-        if (isValid && result.success && creatorId !== undefined) {
-          expect(result.data.creatorId).toEqual(creatorId);
-        }
-      });
+      ])("should validate creatorId: %s -> %s", (_desc, creatorId, isValid) => {});
     });
 
     describe("QuizId Field Validation", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
