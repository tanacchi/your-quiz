# Mutant b6ad31ef Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 304
**Stable ID**: b6ad31ef
**Location**: L166:10–L166:23

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #304
@@ -162,9 +162,9 @@
     });
 
     describe("Offset Field Validation", () => {
       it.each([
-        ["zero offset", 0, true],
+        ["", 0, true],
         ["small offset", 10, true],
         ["large offset", 1000, true],
         ["very large offset", 999999, true],
         ["negative offset", -1, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
