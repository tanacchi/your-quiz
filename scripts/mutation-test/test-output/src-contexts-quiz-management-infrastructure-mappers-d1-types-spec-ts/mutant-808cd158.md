# Mutant 808cd158 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7754
**Stable ID**: 808cd158
**Location**: L444:39–L472:6

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7754
@@ -440,38 +440,10 @@
         expect(conversionResult.isErr()).toBe(true);
       });
     });
 
-    describe("toBasicQuizInfo", () => {
-      test("should convert valid input correctly", () => {
-        const input = {
-          id: 123,
-          solution_id: 456,
-          answer_type: "boolean",
-        };
+    describe("toBasicQuizInfo", () => {});
 
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
-      test("should throw error for invalid input", () => {
-        const conversionResult = Result.fromThrowable(() =>
-          toBasicQuizInfo({ invalid: "data" }),
-        )();
-
-        expect(conversionResult.isErr()).toBe(true);
-      });
-    });
-
     describe("getCountValue", () => {
       test("should return count value", () => {
         const input: CountResult = { total: 42 };
         expect(getCountValue(input)).toBe(42);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
