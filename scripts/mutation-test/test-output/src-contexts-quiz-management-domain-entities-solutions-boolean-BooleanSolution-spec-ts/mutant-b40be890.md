# Mutant b40be890 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5598
**Stable ID**: b40be890
**Location**: L204:9–L204:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5598
@@ -200,9 +200,9 @@
     it("should always return false for any attempt (placeholder)", () => {
       const testCases = [
         { value: true },
         { value: false },
-        "not-an-object",
+        "",
         null,
         undefined,
         123,
       ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
