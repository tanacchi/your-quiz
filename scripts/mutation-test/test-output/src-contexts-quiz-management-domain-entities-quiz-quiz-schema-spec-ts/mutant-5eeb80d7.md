# Mutant 5eeb80d7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3049
**Stable ID**: 5eeb80d7
**Location**: L225:10–L225:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3049
@@ -221,9 +221,9 @@
         ["approved without approvedAt", "approved", false],
         ["rejected", "rejected", true],
         ["invalid status", "invalid_status", false],
         ["empty string", "", false],
-        ["null value", null, false],
+        ["", null, false],
       ])("should validate status: %s -> %s", (_desc, status, isValid) => {
         const data = { ...validQuizData, status };
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
