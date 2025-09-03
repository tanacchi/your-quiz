# Mutant a621313e Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7660
**Stable ID**: a621313e
**Location**: L335:30–L335:49

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7660
@@ -331,9 +331,9 @@
         expect(isCountResult(createValidCountResult())).toBe(true);
       });
 
       test("should return false for invalid data", () => {
-        expect(isCountResult({ invalid: "data" })).toBe(false);
+        expect(isCountResult({})).toBe(false);
       });
     });
 
     describe("isBasicQuizInfo", () => {
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
