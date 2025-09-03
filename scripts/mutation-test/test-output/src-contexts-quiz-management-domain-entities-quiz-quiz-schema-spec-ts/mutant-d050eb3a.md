# Mutant d050eb3a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 2973
**Stable ID**: d050eb3a
**Location**: L162:27–L162:49

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2973
@@ -158,9 +158,9 @@
 
       it.each([
         ["missing id", { value: true }],
         ["empty id", { id: "", value: true }],
-        ["missing value", { id: "solution-123" }],
+        ["missing value", {}],
         ["invalid value type", { id: "solution-123", value: "true" }],
         ["null solution", null],
         ["empty object", {}],
       ])("should reject invalid solution: %s", (_desc, solution) => {
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
