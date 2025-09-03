# Mutant c3181ad4 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7597
**Stable ID**: c3181ad4
**Location**: L243:12–L243:46

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7597
@@ -239,9 +239,9 @@
           expect(parseResult.data.total).toBe(42);
         }
       });
 
-      test("should reject invalid count data", () => {
+      test("", () => {
         const invalidData = [{}, { total: null }, { total: "not-a-number" }];
 
         invalidData.forEach((data) => {
           expectInvalidParse(zodCountResultSchema, data);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
