# Mutant edb570b1 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7656
**Stable ID**: edb570b1
**Location**: L330:63–L332:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7656
@@ -326,11 +326,9 @@
       });
     });
 
     describe("isCountResult", () => {
-      test("should return true for valid count result", () => {
-        expect(isCountResult(createValidCountResult())).toBe(true);
-      });
+      test("should return true for valid count result", () => {});
 
       test("should return false for invalid data", () => {
         expect(isCountResult({ invalid: "data" })).toBe(false);
       });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
