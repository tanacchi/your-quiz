# Mutant df0861eb Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7768
**Stable ID**: df0861eb
**Location**: L465:58–L471:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7768
@@ -461,15 +461,9 @@
           expect(result.answer_type).toBe("boolean");
         }
       });
 
-      test("should throw error for invalid input", () => {
-        const conversionResult = Result.fromThrowable(() =>
-          toBasicQuizInfo({ invalid: "data" }),
-        )();
-
-        expect(conversionResult.isErr()).toBe(true);
-      });
+      test("should throw error for invalid input", () => {});
     });
 
     describe("getCountValue", () => {
       test("should return count value", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
