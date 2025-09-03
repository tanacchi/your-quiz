# Mutant 77b1bb2b Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5580
**Stable ID**: 77b1bb2b
**Location**: L182:59–L198:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5580
@@ -178,26 +178,10 @@
       expect(result.isOk()).toBe(true);
       solution = result._unsafeUnwrap();
     });
 
-    it("should log NotImplemented for checkAnswer", () => {
-      const consoleSpy = vi.spyOn(console, "log");
+    it("should log NotImplemented for checkAnswer", () => {});
 
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
     it("should always return false for any attempt (placeholder)", () => {
       const testCases = [
         { value: true },
         { value: false },
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
