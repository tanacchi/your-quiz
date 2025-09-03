# Mutant f65fa380 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2814
**Stable ID**: f65fa380
**Location**: L45:10–L45:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2814
@@ -41,9 +41,9 @@
     });
 
     describe("CreatorIdSchema", () => {
       it.each([
-        ["valid format", "creator-123", true],
+        ["", "creator-123", true],
         ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
         ["empty string", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
