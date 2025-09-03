# Mutant 7a0f86df Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2971
**Stable ID**: 7a0f86df
**Location**: L162:9–L162:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2971
@@ -158,9 +158,9 @@
 
       it.each([
         ["missing id", { value: true }],
         ["empty id", { id: "", value: true }],
-        ["missing value", { id: "solution-123" }],
+        [],
         ["invalid value type", { id: "solution-123", value: "true" }],
         ["null solution", null],
         ["empty object", {}],
       ])("should reject invalid solution: %s", (_desc, solution) => {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
