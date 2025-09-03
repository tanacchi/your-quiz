# Mutant 64ff4d30 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5576
**Stable ID**: 64ff4d30
**Location**: L173:41–L215:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5576
@@ -169,52 +169,10 @@
       });
     });
   });
 
-  describe("Attempt Integration", () => {
-    let solution: BooleanSolution;
+  describe("Attempt Integration", () => {});
 
-    beforeEach(() => {
-      const result = BooleanSolution.from(validSolutionData);
-      expect(result.isOk()).toBe(true);
-      solution = result._unsafeUnwrap();
-    });
-
-    it("should log NotImplemented for checkAnswer", () => {
-      const consoleSpy = vi.spyOn(console, "log");
-
-      const result = solution.checkAnswer({ value: true });
-
-      expect(result).toBe(false);
-      expect(consoleSpy).toHaveBeenCalledWith(
-        "BooleanSolution.checkAnswer: NotImplemented",
-        expect.objectContaining({
-          solutionId: "solution-1",
-          expectedValue: true,
-          attempt: { value: true },
-        }),
-      );
-
-      consoleSpy.mockRestore();
-    });
-
-    it("should always return false for any attempt (placeholder)", () => {
-      const testCases = [
-        { value: true },
-        { value: false },
-        "not-an-object",
-        null,
-        undefined,
-        123,
-      ];
-
-      testCases.forEach((attempt) => {
-        const result = solution.checkAnswer(attempt);
-        expect(result).toBe(false);
-      });
-    });
-  });
-
   describe("Draft Usage", () => {
     it("should work with Draft pattern", () => {
       const draft = new BooleanSolution.Draft();
       draft.update("value", false);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
