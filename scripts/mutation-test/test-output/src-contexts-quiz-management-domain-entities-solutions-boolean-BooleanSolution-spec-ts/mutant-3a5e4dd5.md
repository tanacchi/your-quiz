# Mutant 3a5e4dd5 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 5593
**Stable ID**: 3a5e4dd5
**Location**: L201:25–L208:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5593
@@ -197,16 +197,9 @@
       consoleSpy.mockRestore();
     });
 
     it("should always return false for any attempt (placeholder)", () => {
-      const testCases = [
-        { value: true },
-        { value: false },
-        "not-an-object",
-        null,
-        undefined,
-        123,
-      ];
+      const testCases = [];
 
       testCases.forEach((attempt) => {
         const result = solution.checkAnswer(attempt);
         expect(result).toBe(false);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
