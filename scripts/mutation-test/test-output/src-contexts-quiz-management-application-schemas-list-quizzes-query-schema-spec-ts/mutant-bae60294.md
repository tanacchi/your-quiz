# Mutant bae60294 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 300
**Stable ID**: bae60294
**Location**: L164:14–L164:39

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #300
@@ -160,9 +160,9 @@
         }
       });
     });
 
-    describe("Offset Field Validation", () => {
+    describe("", () => {
       it.each([
         ["zero offset", 0, true],
         ["small offset", 10, true],
         ["large offset", 1000, true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
