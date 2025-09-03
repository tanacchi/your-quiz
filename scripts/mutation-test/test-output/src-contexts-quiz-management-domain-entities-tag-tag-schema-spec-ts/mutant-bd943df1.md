# Mutant bd943df1 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6865
**Stable ID**: bd943df1
**Location**: L52:10–L52:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6865
@@ -48,9 +48,9 @@
     });
 
     describe("UserId", () => {
       it.each([
-        ["valid format", "user-123", true],
+        ["", "user-123", true],
         ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
         ["valid single char", "u", true],
         ["empty string", "", false],
         ["null value", null, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
