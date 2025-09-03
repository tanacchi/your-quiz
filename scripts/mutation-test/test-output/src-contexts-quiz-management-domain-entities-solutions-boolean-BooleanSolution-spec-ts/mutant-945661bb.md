# Mutant 945661bb Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5651
**Stable ID**: 945661bb
**Location**: L290:63–L296:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5651
@@ -286,16 +286,10 @@
     });
   });
 
   describe("Factory Methods", () => {
-    it("should create BooleanSolution from valid data", () => {
-      const result = BooleanSolution.from(validSolutionData);
+    it("should create BooleanSolution from valid data", () => {});
 
-      const solution = result._unsafeUnwrap({ withStackTrace: true });
-      expect(solution.get("id")).toBe("solution-1");
-      expect(solution.get("value")).toBe(true);
-    });
-
     it("should create from draft", () => {
       const draft = new BooleanSolution.Draft();
       draft.with(validSolutionData as Record<string, unknown>);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
