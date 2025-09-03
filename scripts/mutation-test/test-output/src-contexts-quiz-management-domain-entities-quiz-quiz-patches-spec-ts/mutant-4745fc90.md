# Mutant 4745fc90 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 1776
**Stable ID**: 4745fc90
**Location**: L129:9–L129:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1776
@@ -125,9 +125,9 @@
 
     describe("suggestIdFieldPatches", () => {
       it.each([
         ["id field", "id"],
-        ["creatorId field", "creatorId"],
+        [],
       ])("should handle %s", (_desc, fieldName) => {
         const suggester = suggestIdFieldPatches(fieldName as keyof QuizInput);
 
         const testCases = [
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
