# Mutant 197f1d9a Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 126
**Stable ID**: 197f1d9a
**Location**: L83:15–L92:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #126
@@ -79,18 +79,9 @@
       });
     });
 
     describe("CreatorId Field Validation", () => {
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
+      it.each([])("should validate creatorId: %s -> %s", (_desc, creatorId, isValid) => {
         const input = creatorId === undefined ? {} : { creatorId };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
