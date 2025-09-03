# Mutant 89f0f523 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6133
**Stable ID**: 89f0f523
**Location**: L42:10–L42:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6133
@@ -38,9 +38,9 @@
     });
 
     describe("RelationType validation", () => {
       it.each([
-        ["hierarchy", "hierarchy", true],
+        ["", "hierarchy", true],
         ["category", "category", true],
         ["synonym", "synonym", true],
         ["related", "related", true],
         ["invalid type", "invalid", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
