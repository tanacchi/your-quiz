# Mutant 94429bbc Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 5976
**Stable ID**: 94429bbc
**Location**: L219:45–L219:49

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5976
@@ -215,9 +215,9 @@
     it("should handle typical quiz solution scenarios", () => {
       const quizSolutions = [
         { id: "solution-correct-answer", value: true },
         { id: "solution-incorrect-answer", value: false },
-        { id: "solution-yes-no-yes", value: true },
+        { id: "solution-yes-no-yes", value: false },
         { id: "solution-yes-no-no", value: false },
         { id: "solution-true-false-true", value: true },
         { id: "solution-true-false-false", value: false },
       ];
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
