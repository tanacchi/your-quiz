# Mutant b73a810d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 2977
**Stable ID**: b73a810d
**Location**: L163:32–L163:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2977
@@ -159,9 +159,9 @@
       it.each([
         ["missing id", { value: true }],
         ["empty id", { id: "", value: true }],
         ["missing value", { id: "solution-123" }],
-        ["invalid value type", { id: "solution-123", value: "true" }],
+        ["invalid value type", {}],
         ["null solution", null],
         ["empty object", {}],
       ])("should reject invalid solution: %s", (_desc, solution) => {
         const data = { ...validQuizData, solution };
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
