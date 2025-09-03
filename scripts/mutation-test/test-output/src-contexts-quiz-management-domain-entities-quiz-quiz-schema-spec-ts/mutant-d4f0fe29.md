# Mutant d4f0fe29 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2818
**Stable ID**: d4f0fe29
**Location**: L46:10–L46:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2818
@@ -42,9 +42,9 @@
 
     describe("CreatorIdSchema", () => {
       it.each([
         ["valid format", "creator-123", true],
-        ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
+        ["", "550e8400-e29b-41d4-a716-446655440000", true],
         ["empty string", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
       ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
