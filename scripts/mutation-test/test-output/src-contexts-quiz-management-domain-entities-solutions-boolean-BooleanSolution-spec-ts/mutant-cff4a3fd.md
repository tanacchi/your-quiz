# Mutant cff4a3fd Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 5653
**Stable ID**: cff4a3fd
**Location**: L293:63–L293:67

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5653
@@ -289,9 +289,9 @@
   describe("Factory Methods", () => {
     it("should create BooleanSolution from valid data", () => {
       const result = BooleanSolution.from(validSolutionData);
 
-      const solution = result._unsafeUnwrap({ withStackTrace: true });
+      const solution = result._unsafeUnwrap({ withStackTrace: false });
       expect(solution.get("id")).toBe("solution-1");
       expect(solution.get("value")).toBe(true);
     });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
