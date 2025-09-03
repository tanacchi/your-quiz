# Mutant dc3da5d5 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5649
**Stable ID**: dc3da5d5
**Location**: L289:37–L306:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5649
@@ -285,27 +285,10 @@
       expect(Object.isFrozen(solution)).toBe(true);
     });
   });
 
-  describe("Factory Methods", () => {
-    it("should create BooleanSolution from valid data", () => {
-      const result = BooleanSolution.from(validSolutionData);
+  describe("Factory Methods", () => {});
 
-      const solution = result._unsafeUnwrap({ withStackTrace: true });
-      expect(solution.get("id")).toBe("solution-1");
-      expect(solution.get("value")).toBe(true);
-    });
-
-    it("should create from draft", () => {
-      const draft = new BooleanSolution.Draft();
-      draft.with(validSolutionData as Record<string, unknown>);
-
-      const result = BooleanSolution.fromDraft(draft);
-      const entity = result._unsafeUnwrap({ withStackTrace: true });
-      expect(entity).toBeDefined();
-    });
-  });
-
   describe("Type Safety", () => {
     it("should enforce return type constraints", () => {
       const result = BooleanSolution.from(validSolutionData);
       const solution = result._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
