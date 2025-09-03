# Mutant 41a8a9aa Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5904
**Stable ID**: 41a8a9aa
**Location**: L150:10–L150:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5904
@@ -146,9 +146,9 @@
       });
     });
 
     describe("Minimal Valid Data", () => {
-      it("should accept minimal valid data with single character id", () => {
+      it("", () => {
         const minimalData = {
           id: "s",
           value: true,
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
