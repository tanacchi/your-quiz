# Mutant 98ea6a59 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7773
**Stable ID**: 98ea6a59
**Location**: L474:14–L474:29

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7773
@@ -470,9 +470,9 @@
         expect(conversionResult.isErr()).toBe(true);
       });
     });
 
-    describe("getCountValue", () => {
+    describe("", () => {
       test("should return count value", () => {
         const input: CountResult = { total: 42 };
         expect(getCountValue(input)).toBe(42);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
