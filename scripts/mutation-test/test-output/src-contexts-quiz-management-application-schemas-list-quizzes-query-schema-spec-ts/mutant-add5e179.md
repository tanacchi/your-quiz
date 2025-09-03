# Mutant add5e179 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 271
**Stable ID**: add5e179
**Location**: L137:27–L137:31

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #271
@@ -133,9 +133,9 @@
         ["zero limit", 0, false],
         ["negative limit", -1, false],
         ["over maximum limit", 101, false],
         ["decimal number", 10.5, false],
-        ["string number", "10", false],
+        ["string number", "", false],
         ["null value", null, false],
         ["undefined value", undefined, true], // Should apply default
       ])("should validate limit: %s -> %s", (_desc, limit, isValid) => {
         const input = limit === undefined ? {} : { limit };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
