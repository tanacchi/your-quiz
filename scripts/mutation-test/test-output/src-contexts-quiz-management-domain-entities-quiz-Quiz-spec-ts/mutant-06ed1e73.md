# Mutant 06ed1e73 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 922
**Stable ID**: 06ed1e73
**Location**: L37:10–L37:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #922
@@ -33,9 +33,9 @@
     });
 
     describe("CreatorId validation", () => {
       it.each([
-        ["valid alphanumeric", "creator-1", true],
+        ["", "creator-1", true],
         ["valid with numbers", "creator123", true],
         ["empty string", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
