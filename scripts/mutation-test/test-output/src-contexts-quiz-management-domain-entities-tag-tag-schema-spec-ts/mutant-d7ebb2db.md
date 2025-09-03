# Mutant d7ebb2db Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6869
**Stable ID**: d7ebb2db
**Location**: L53:10–L53:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6869
@@ -49,9 +49,9 @@
 
     describe("UserId", () => {
       it.each([
         ["valid format", "user-123", true],
-        ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
+        ["", "550e8400-e29b-41d4-a716-446655440000", true],
         ["valid single char", "u", true],
         ["empty string", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
