# Mutant 099f39cb Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3046
**Stable ID**: 099f39cb
**Location**: L224:26–L224:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3046
@@ -220,9 +220,9 @@
         ["pending_approval", "pending_approval", true],
         ["approved without approvedAt", "approved", false],
         ["rejected", "rejected", true],
         ["invalid status", "invalid_status", false],
-        ["empty string", "", false],
+        ["empty string", "Stryker was here!", false],
         ["null value", null, false],
       ])("should validate status: %s -> %s", (_desc, status, isValid) => {
         const data = { ...validQuizData, status };
         const result = QuizSchema.safeParse(data);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
