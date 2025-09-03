# Mutant ed39adb1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4987
**Stable ID**: ed39adb1
**Location**: L55:10–L55:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #4987
@@ -51,9 +51,9 @@
       it.each([
         ["valid format", "solution-123", true],
         ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
         ["empty string", "", false],
-        ["null value", null, false],
+        ["", null, false],
         ["undefined value", undefined, false],
       ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
         const result = SolutionId.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
