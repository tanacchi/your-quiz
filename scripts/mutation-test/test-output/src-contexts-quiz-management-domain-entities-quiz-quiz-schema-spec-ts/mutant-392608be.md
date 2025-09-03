# Mutant 392608be Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2979
**Stable ID**: 392608be
**Location**: L163:61–L163:67

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2979
@@ -159,9 +159,9 @@
       it.each([
         ["missing id", { value: true }],
         ["empty id", { id: "", value: true }],
         ["missing value", { id: "solution-123" }],
-        ["invalid value type", { id: "solution-123", value: "true" }],
+        ["invalid value type", { id: "solution-123", value: "" }],
         ["null solution", null],
         ["empty object", {}],
       ])("should reject invalid solution: %s", (_desc, solution) => {
         const data = { ...validQuizData, solution };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
