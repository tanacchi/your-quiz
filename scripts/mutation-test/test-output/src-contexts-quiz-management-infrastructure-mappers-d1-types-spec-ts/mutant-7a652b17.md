# Mutant 7a652b17 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7756
**Stable ID**: 7a652b17
**Location**: L445:58–L463:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7756
@@ -441,28 +441,10 @@
       });
     });
 
     describe("toBasicQuizInfo", () => {
-      test("should convert valid input correctly", () => {
-        const input = {
-          id: 123,
-          solution_id: 456,
-          answer_type: "boolean",
-        };
+      test("should convert valid input correctly", () => {});
 
-        const conversionResult = Result.fromThrowable(() =>
-          toBasicQuizInfo(input),
-        )();
-        expect(conversionResult.isOk()).toBe(true);
-
-        if (conversionResult.isOk()) {
-          const result = conversionResult.value;
-          expect(result.id).toBe("123");
-          expect(result.solution_id).toBe("456");
-          expect(result.answer_type).toBe("boolean");
-        }
-      });
-
       test("should throw error for invalid input", () => {
         const conversionResult = Result.fromThrowable(() =>
           toBasicQuizInfo({ invalid: "data" }),
         )();
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
