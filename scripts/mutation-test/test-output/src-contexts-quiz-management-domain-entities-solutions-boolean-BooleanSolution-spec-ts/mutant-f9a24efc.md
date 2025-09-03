# Mutant f9a24efc Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 5594
**Stable ID**: f9a24efc
**Location**: L202:9–L202:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5594
@@ -198,9 +198,9 @@
     });
 
     it("should always return false for any attempt (placeholder)", () => {
       const testCases = [
-        { value: true },
+        {},
         { value: false },
         "not-an-object",
         null,
         undefined,
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
