# Mutant 8ab4e21e Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6861
**Stable ID**: 8ab4e21e
**Location**: L50:14–L50:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6861
@@ -46,9 +46,9 @@
         }
       });
     });
 
-    describe("UserId", () => {
+    describe("", () => {
       it.each([
         ["valid format", "user-123", true],
         ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
         ["valid single char", "u", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
