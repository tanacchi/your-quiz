# Mutant ab4a05eb Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 215
**Stable ID**: ab4a05eb
**Location**: L112:25–L112:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #215
@@ -108,9 +108,9 @@
         ["valid alphanumeric", ["q1"], true],
         ["empty string in array", [""], false],
         ["whitespace only", ["   "], true], // whitespace-only strings have length > 0
         ["mixed valid and empty", ["quiz-1", ""], false],
-        ["empty array", [], true],
+        ["empty array", ["Stryker was here"], true],
         ["non-array value", "quiz-123", false],
         ["null value", null, false],
         ["undefined value", undefined, true],
       ])("should validate quizId: %s -> %s", (_desc, quizId, isValid) => {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
