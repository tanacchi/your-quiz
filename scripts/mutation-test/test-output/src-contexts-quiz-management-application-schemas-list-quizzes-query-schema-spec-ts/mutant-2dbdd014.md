# Mutant 2dbdd014 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 124
**Stable ID**: 2dbdd014
**Location**: L82:14–L82:42

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #124
@@ -78,9 +78,9 @@
         }
       });
     });
 
-    describe("CreatorId Field Validation", () => {
+    describe("", () => {
       it.each([
         ["valid single creatorId", "creator-123", true],
         ["valid UUID format", "550e8400-e29b-41d4-a716-446655440000", true],
         ["valid alphanumeric", "user123", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
