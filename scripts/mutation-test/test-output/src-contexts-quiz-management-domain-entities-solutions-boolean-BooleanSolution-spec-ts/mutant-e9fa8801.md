# Mutant e9fa8801 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5643
**Stable ID**: e9fa8801
**Location**: L281:8–L281:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5643
@@ -277,9 +277,9 @@
       // Updated has new value
       expect(updatedSolution.get("value")).toBe(false);
     });
 
-    it("should freeze the solution instance", () => {
+    it("", () => {
       const result = BooleanSolution.from(validSolutionData);
       const solution = result._unsafeUnwrap({ withStackTrace: true });
 
       expect(Object.isFrozen(solution)).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
