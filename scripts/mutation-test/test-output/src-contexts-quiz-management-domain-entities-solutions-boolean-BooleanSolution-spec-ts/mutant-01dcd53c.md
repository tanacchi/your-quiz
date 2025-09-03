# Mutant 01dcd53c Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5644
**Stable ID**: 01dcd53c
**Location**: L281:53–L286:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5644
@@ -277,14 +277,9 @@
       // Updated has new value
       expect(updatedSolution.get("value")).toBe(false);
     });
 
-    it("should freeze the solution instance", () => {
-      const result = BooleanSolution.from(validSolutionData);
-      const solution = result._unsafeUnwrap({ withStackTrace: true });
-
-      expect(Object.isFrozen(solution)).toBe(true);
-    });
+    it("should freeze the solution instance", () => {});
   });
 
   describe("Factory Methods", () => {
     it("should create BooleanSolution from valid data", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
