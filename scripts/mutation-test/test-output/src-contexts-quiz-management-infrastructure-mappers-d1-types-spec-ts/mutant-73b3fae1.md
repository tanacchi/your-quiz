# Mutant 73b3fae1 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7533
**Stable ID**: 73b3fae1
**Location**: L141:14–L141:40

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7533
@@ -137,9 +137,9 @@
         });
       });
     });
 
-    describe("Matching Strategy Schema", () => {
+    describe("", () => {
       test("should validate valid matching strategies", () => {
         const validStrategies = ["exact", "partial", "regex"];
 
         validStrategies.forEach((strategy) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
