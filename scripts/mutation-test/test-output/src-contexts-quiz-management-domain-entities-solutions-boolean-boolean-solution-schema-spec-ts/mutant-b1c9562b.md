# Mutant b1c9562b Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5885
**Stable ID**: b1c9562b
**Location**: L134:38–L134:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5885
@@ -130,9 +130,9 @@
       it.each([
         ["special characters", "solution-!@#$%^&*()"],
         ["unicode characters", "solution-プログラミング"],
         ["emoji", "solution-🚀"],
-        ["very long id", `solution-${"a".repeat(100)}`],
+        ["very long id", `solution-${"".repeat(100)}`],
         ["mixed case", "Solution-MixedCase-123"],
         ["numbers only", "123456789"],
         ["dots and dashes", "solution.test-case.123"],
       ])("should handle id with %s", (_desc, id) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
