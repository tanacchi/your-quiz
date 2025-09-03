# Mutant 3f8f2055 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5604
**Stable ID**: 3f8f2055
**Location**: L218:48–L233:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5604
@@ -214,25 +214,10 @@
     });
   });
 
   describe("Draft Usage", () => {
-    it("should work with Draft pattern", () => {
-      const draft = new BooleanSolution.Draft();
-      draft.update("value", false);
-      draft.with({
-        id: SolutionId.parse("solution-draft"),
-      });
+    it("should work with Draft pattern", () => {});
 
-      const entityResult = draft.commit();
-      expect(entityResult.isOk()).toBe(true);
-
-      if (entityResult.isOk()) {
-        const solution = entityResult.value;
-        expect(solution.get("value")).toBe(false);
-        expect(solution.get("id")).toBe("solution-draft");
-      }
-    });
-
     it("should handle Draft validation errors", () => {
       const draft = new BooleanSolution.Draft();
       // Test with invalid data by using with() instead of update()
       draft.with({
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
