# Mutant ede6bb25 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 156
**Stable ID**: ede6bb25
**Location**: L91:10–L91:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #156
@@ -87,9 +87,9 @@
         ["empty string", "", false],
         ["whitespace only", "   ", true], // whitespace-only strings are valid (length > 0)
         ["array value (should reject)", ["creator-123"], false],
         ["null value", null, false],
-        ["undefined value", undefined, true],
+        ["", undefined, true],
       ])("should validate creatorId: %s -> %s", (_desc, creatorId, isValid) => {
         const input = creatorId === undefined ? {} : { creatorId };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
