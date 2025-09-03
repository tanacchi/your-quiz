# Mutant 8f38b47d Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6110
**Stable ID**: 8f38b47d
**Location**: L29:10–L29:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6110
@@ -25,9 +25,9 @@
     });
 
     describe("UserId validation", () => {
       it.each([
-        ["valid alphanumeric", "user-1", true],
+        ["", "user-1", true],
         ["valid with numbers", "user123", true],
         ["empty string", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
