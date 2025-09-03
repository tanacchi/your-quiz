# Mutant 1bf07862 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2974
**Stable ID**: 1bf07862
**Location**: L162:33–L162:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2974
@@ -158,9 +158,9 @@
 
       it.each([
         ["missing id", { value: true }],
         ["empty id", { id: "", value: true }],
-        ["missing value", { id: "solution-123" }],
+        ["missing value", { id: "" }],
         ["invalid value type", { id: "solution-123", value: "true" }],
         ["null solution", null],
         ["empty object", {}],
       ])("should reject invalid solution: %s", (_desc, solution) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
