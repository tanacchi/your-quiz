# Mutant abe60e6a Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6814
**Stable ID**: abe60e6a
**Location**: L27:12–L27:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6814
@@ -23,9 +23,9 @@
       },
     ],
   };
 
-  describe("Brand Types", () => {
+  describe("", () => {
     describe("TagId", () => {
       it.each([
         ["valid alphanumeric", "tag-123", true],
         ["valid with underscore", "tag_test", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
