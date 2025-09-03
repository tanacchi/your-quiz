# Mutant 3f6e7a07 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 5595
**Stable ID**: 3f6e7a07
**Location**: L202:18–L202:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5595
@@ -198,10 +198,10 @@
     });
 
     it("should always return false for any attempt (placeholder)", () => {
       const testCases = [
-        { value: true },
         { value: false },
+        { value: false },
         "not-an-object",
         null,
         undefined,
         123,
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
