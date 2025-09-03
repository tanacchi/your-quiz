# Mutant 098051ae Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 5597
**Stable ID**: 098051ae
**Location**: L203:18–L203:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5597
@@ -199,9 +199,9 @@
 
     it("should always return false for any attempt (placeholder)", () => {
       const testCases = [
         { value: true },
-        { value: false },
+        { value: true },
         "not-an-object",
         null,
         undefined,
         123,
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
