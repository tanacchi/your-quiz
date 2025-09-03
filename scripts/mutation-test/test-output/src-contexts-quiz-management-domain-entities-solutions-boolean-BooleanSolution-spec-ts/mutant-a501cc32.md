# Mutant a501cc32 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5632
**Stable ID**: a501cc32
**Location**: L263:34–L287:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5632
@@ -259,34 +259,10 @@
       expect(entity).toBeDefined();
     });
   });
 
-  describe("Immutability", () => {
-    it("should return new instance on updates", () => {
-      const result = BooleanSolution.from(validSolutionData);
-      expect(result.isOk()).toBe(true);
-      const originalSolution = result._unsafeUnwrap();
+  describe("Immutability", () => {});
 
-      const updatedResult = originalSolution.update("value", false);
-      expect(updatedResult.isOk()).toBe(true);
-      const updatedSolution = updatedResult._unsafeUnwrap();
-
-      // Different instances
-      expect(originalSolution).not.toBe(updatedSolution);
-      // Original unchanged
-      expect(originalSolution.get("value")).toBe(true);
-      // Updated has new value
-      expect(updatedSolution.get("value")).toBe(false);
-    });
-
-    it("should freeze the solution instance", () => {
-      const result = BooleanSolution.from(validSolutionData);
-      const solution = result._unsafeUnwrap({ withStackTrace: true });
-
-      expect(Object.isFrozen(solution)).toBe(true);
-    });
-  });
-
   describe("Factory Methods", () => {
     it("should create BooleanSolution from valid data", () => {
       const result = BooleanSolution.from(validSolutionData);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
