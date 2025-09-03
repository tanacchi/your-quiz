# Mutant 8fcf31f0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1778
**Stable ID**: 8fcf31f0
**Location**: L129:29–L129:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1778
@@ -125,9 +125,9 @@
 
     describe("suggestIdFieldPatches", () => {
       it.each([
         ["id field", "id"],
-        ["creatorId field", "creatorId"],
+        ["creatorId field", ""],
       ])("should handle %s", (_desc, fieldName) => {
         const suggester = suggestIdFieldPatches(fieldName as keyof QuizInput);
 
         const testCases = [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
