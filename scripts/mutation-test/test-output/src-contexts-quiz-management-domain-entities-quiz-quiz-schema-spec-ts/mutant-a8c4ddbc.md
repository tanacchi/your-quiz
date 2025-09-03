# Mutant a8c4ddbc Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3045
**Stable ID**: a8c4ddbc
**Location**: L224:10–L224:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3045
@@ -220,9 +220,9 @@
         ["pending_approval", "pending_approval", true],
         ["approved without approvedAt", "approved", false],
         ["rejected", "rejected", true],
         ["invalid status", "invalid_status", false],
-        ["empty string", "", false],
+        ["", "", false],
         ["null value", null, false],
       ])("should validate status: %s -> %s", (_desc, status, isValid) => {
         const data = { ...validQuizData, status };
         const result = QuizSchema.safeParse(data);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
