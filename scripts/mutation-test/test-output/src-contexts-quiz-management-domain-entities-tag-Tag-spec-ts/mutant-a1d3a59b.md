# Mutant a1d3a59b Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6083
**Stable ID**: a1d3a59b
**Location**: L14:14–L14:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6083
@@ -10,9 +10,9 @@
     relatedTags: [],
   } as const;
 
   describe("Brand Types", () => {
-    describe("TagId validation", () => {
+    describe("", () => {
       it.each([
         ["valid alphanumeric", "tag-1", true],
         ["valid with numbers", "tag123", true],
         ["empty string", "", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
