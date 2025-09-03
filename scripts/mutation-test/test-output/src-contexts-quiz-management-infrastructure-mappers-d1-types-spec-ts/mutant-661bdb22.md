# Mutant 661bdb22 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7799
**Stable ID**: 661bdb22
**Location**: L511:36–L516:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7799
@@ -507,13 +507,8 @@
 
     test("should handle edge cases gracefully", () => {
       const edgeCases = [{}, null, undefined, "", 123, []];
 
-      edgeCases.forEach((input) => {
-        expect(isQuizRow(input)).toBe(false);
-        expect(isCountResult(input)).toBe(false);
-        expect(isBasicQuizInfo(input)).toBe(false);
-        expect(isParsedChoice(input)).toBe(false);
-      });
+      edgeCases.forEach((input) => {});
     });
   });
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
