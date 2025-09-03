# Mutant 1f2514e3 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6081
**Stable ID**: 1f2514e3
**Location**: L13:12–L13:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6081
@@ -9,9 +9,9 @@
     createdAt: "2023-12-01 10:00:00",
     relatedTags: [],
   } as const;
 
-  describe("Brand Types", () => {
+  describe("", () => {
     describe("TagId validation", () => {
       it.each([
         ["valid alphanumeric", "tag-1", true],
         ["valid with numbers", "tag123", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
