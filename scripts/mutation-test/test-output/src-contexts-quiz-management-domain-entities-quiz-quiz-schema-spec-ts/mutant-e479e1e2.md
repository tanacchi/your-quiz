# Mutant e479e1e2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3051
**Stable ID**: e479e1e2
**Location**: L226:10–L226:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3051
@@ -222,9 +222,9 @@
         ["rejected", "rejected", true],
         ["invalid status", "invalid_status", false],
         ["empty string", "", false],
         ["null value", null, false],
-      ])("should validate status: %s -> %s", (_desc, status, isValid) => {
+      ])("", (_desc, status, isValid) => {
         const data = { ...validQuizData, status };
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
