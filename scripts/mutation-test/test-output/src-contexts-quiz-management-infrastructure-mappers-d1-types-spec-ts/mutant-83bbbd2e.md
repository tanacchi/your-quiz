# Mutant 83bbbd2e Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7596
**Stable ID**: 83bbbd2e
**Location**: L238:34–L240:10

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7596
@@ -234,11 +234,9 @@
         const stringTotal = { total: "42" };
         const parseResult = zodCountResultSchema.safeParse(stringTotal);
 
         expect(parseResult.success).toBe(true);
-        if (parseResult.success) {
-          expect(parseResult.data.total).toBe(42);
-        }
+        if (parseResult.success) {}
       });
 
       test("should reject invalid count data", () => {
         const invalidData = [{}, { total: null }, { total: "not-a-number" }];
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
