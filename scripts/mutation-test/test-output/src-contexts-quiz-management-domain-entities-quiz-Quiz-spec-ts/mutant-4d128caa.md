# Mutant 4d128caa Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 918
**Stable ID**: 4d128caa
**Location**: L35:14–L35:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #918
@@ -31,9 +31,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("CreatorId validation", () => {
+    describe("", () => {
       it.each([
         ["valid alphanumeric", "creator-1", true],
         ["valid with numbers", "creator123", true],
         ["empty string", "", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
