# Mutant 9e26417d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2803
**Stable ID**: 9e26417d
**Location**: L35:10–L35:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2803
@@ -31,9 +31,9 @@
       it.each([
         ["valid format", "quiz-123", true],
         ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
         ["empty string", "", false],
-        ["null value", null, false],
+        ["", null, false],
         ["undefined value", undefined, false],
       ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
         const result = QuizIdSchema.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
