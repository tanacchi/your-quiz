# Mutant af057ba2 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 5596
**Stable ID**: af057ba2
**Location**: L203:9–L203:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5596
@@ -199,9 +199,9 @@
 
     it("should always return false for any attempt (placeholder)", () => {
       const testCases = [
         { value: true },
-        { value: false },
+        {},
         "not-an-object",
         null,
         undefined,
         123,
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
