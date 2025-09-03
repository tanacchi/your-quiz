# Mutant 09db7dcb Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 1772
**Stable ID**: 09db7dcb
**Location**: L127:15–L130:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1772
@@ -123,12 +123,9 @@
       });
     });
 
     describe("suggestIdFieldPatches", () => {
-      it.each([
-        ["id field", "id"],
-        ["creatorId field", "creatorId"],
-      ])("should handle %s", (_desc, fieldName) => {
+      it.each([])("should handle %s", (_desc, fieldName) => {
         const suggester = suggestIdFieldPatches(fieldName as keyof QuizInput);
 
         const testCases = [
           ["untrimmed id", "  valid-id  ", [{ [fieldName]: "valid-id" }]],
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
