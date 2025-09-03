# Mutant bb553ca1 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6816
**Stable ID**: bb553ca1
**Location**: L28:14–L28:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6816
@@ -24,9 +24,9 @@
     ],
   };
 
   describe("Brand Types", () => {
-    describe("TagId", () => {
+    describe("", () => {
       it.each([
         ["valid alphanumeric", "tag-123", true],
         ["valid with underscore", "tag_test", true],
         ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
