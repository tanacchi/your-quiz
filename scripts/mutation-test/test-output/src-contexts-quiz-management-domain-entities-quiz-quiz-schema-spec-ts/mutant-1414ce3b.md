# Mutant 1414ce3b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2806
**Stable ID**: 1414ce3b
**Location**: L36:10–L36:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2806
@@ -32,9 +32,9 @@
         ["valid format", "quiz-123", true],
         ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
         ["empty string", "", false],
         ["null value", null, false],
-        ["undefined value", undefined, false],
+        ["", undefined, false],
       ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
         const result = QuizIdSchema.safeParse(input);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
