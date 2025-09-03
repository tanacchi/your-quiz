# Mutant c89dbfdd Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2980
**Stable ID**: c89dbfdd
**Location**: L164:9–L164:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2980
@@ -160,9 +160,9 @@
         ["missing id", { value: true }],
         ["empty id", { id: "", value: true }],
         ["missing value", { id: "solution-123" }],
         ["invalid value type", { id: "solution-123", value: "true" }],
-        ["null solution", null],
+        [],
         ["empty object", {}],
       ])("should reject invalid solution: %s", (_desc, solution) => {
         const data = { ...validQuizData, solution };
         const result = QuizSchema.safeParse(data);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
