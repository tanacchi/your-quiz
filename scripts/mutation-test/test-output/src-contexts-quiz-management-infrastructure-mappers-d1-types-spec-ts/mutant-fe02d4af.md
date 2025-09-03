# Mutant fe02d4af Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7654
**Stable ID**: fe02d4af
**Location**: L329:37–L337:6

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7654
@@ -325,18 +325,10 @@
         });
       });
     });
 
-    describe("isCountResult", () => {
-      test("should return true for valid count result", () => {
-        expect(isCountResult(createValidCountResult())).toBe(true);
-      });
+    describe("isCountResult", () => {});
 
-      test("should return false for invalid data", () => {
-        expect(isCountResult({ invalid: "data" })).toBe(false);
-      });
-    });
-
     describe("isBasicQuizInfo", () => {
       test("should return true for valid basic quiz info", () => {
         expect(isBasicQuizInfo(createValidBasicQuizInfo())).toBe(true);
       });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
