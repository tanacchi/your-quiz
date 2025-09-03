# Mutant 1cc18dd7 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5634
**Stable ID**: 1cc18dd7
**Location**: L264:55–L279:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5634
@@ -260,25 +260,10 @@
     });
   });
 
   describe("Immutability", () => {
-    it("should return new instance on updates", () => {
-      const result = BooleanSolution.from(validSolutionData);
-      expect(result.isOk()).toBe(true);
-      const originalSolution = result._unsafeUnwrap();
+    it("should return new instance on updates", () => {});
 
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
     it("should freeze the solution instance", () => {
       const result = BooleanSolution.from(validSolutionData);
       const solution = result._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
