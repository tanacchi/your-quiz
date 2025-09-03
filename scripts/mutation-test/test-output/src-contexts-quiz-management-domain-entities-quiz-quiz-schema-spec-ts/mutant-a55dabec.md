# Mutant a55dabec Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2829
**Stable ID**: a55dabec
**Location**: L49:10–L49:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2829
@@ -45,9 +45,9 @@
         ["valid format", "creator-123", true],
         ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
         ["empty string", "", false],
         ["null value", null, false],
-        ["undefined value", undefined, false],
+        ["", undefined, false],
       ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
         const result = CreatorIdSchema.safeParse(input);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
