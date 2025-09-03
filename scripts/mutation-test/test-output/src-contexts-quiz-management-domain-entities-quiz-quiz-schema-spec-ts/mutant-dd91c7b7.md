# Mutant dd91c7b7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2961
**Stable ID**: dd91c7b7
**Location**: L159:15–L166:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2961
@@ -155,16 +155,9 @@
           expect(result.data.solution).toEqual(validSolution);
         }
       });
 
-      it.each([
-        ["missing id", { value: true }],
-        ["empty id", { id: "", value: true }],
-        ["missing value", { id: "solution-123" }],
-        ["invalid value type", { id: "solution-123", value: "true" }],
-        ["null solution", null],
-        ["empty object", {}],
-      ])("should reject invalid solution: %s", (_desc, solution) => {
+      it.each([])("should reject invalid solution: %s", (_desc, solution) => {
         const data = { ...validQuizData, solution };
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(false);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
