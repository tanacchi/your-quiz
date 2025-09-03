# Mutant 1049cd12 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 5997
**Stable ID**: 1049cd12
**Location**: L241:18–L241:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5997
@@ -237,9 +237,9 @@
     it("should handle solutions with complex IDs", () => {
       const complexSolutions = [
         {
           id: "quiz-123-solution-456-boolean-true",
-          value: true,
+          value: false,
         },
         {
           id: "550e8400-e29b-41d4-a716-446655440000",
           value: false,
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
