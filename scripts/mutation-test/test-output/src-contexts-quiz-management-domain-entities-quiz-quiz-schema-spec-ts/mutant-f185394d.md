# Mutant f185394d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3198
**Stable ID**: f185394d
**Location**: L406:20–L406:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3198
@@ -402,9 +402,9 @@
         [
           "complex id format",
           {
             id: "solution-uuid-550e8400-e29b-41d4-a716-446655440000",
-            value: true,
+            value: false,
           },
         ],
       ])("should accept %s", (_desc, solution) => {
         const data = { ...validQuizData, solution };
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
