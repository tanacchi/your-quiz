# Mutant 14c4098a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3179
**Stable ID**: 14c4098a
**Location**: L391:24–L391:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3179
@@ -387,9 +387,9 @@
 
       it("should handle maximum valid explanation length", () => {
         const maxExplanationData = {
           ...validQuizData,
-          explanation: "A".repeat(1000), // exactly 1000 characters
+          explanation: "".repeat(1000), // exactly 1000 characters
         };
         const result = QuizSchema.safeParse(maxExplanationData);
         expect(result.success).toBe(true);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
