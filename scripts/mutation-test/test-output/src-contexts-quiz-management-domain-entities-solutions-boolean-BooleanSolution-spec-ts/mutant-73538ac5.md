# Mutant 73538ac5 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5602
**Stable ID**: 73538ac5
**Location**: L217:33–L261:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5602
@@ -213,54 +213,10 @@
       });
     });
   });
 
-  describe("Draft Usage", () => {
-    it("should work with Draft pattern", () => {
-      const draft = new BooleanSolution.Draft();
-      draft.update("value", false);
-      draft.with({
-        id: SolutionId.parse("solution-draft"),
-      });
+  describe("Draft Usage", () => {});
 
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
-    it("should handle Draft validation errors", () => {
-      const draft = new BooleanSolution.Draft();
-      // Test with invalid data by using with() instead of update()
-      draft.with({
-        id: SolutionId.parse("solution-draft"),
-        value: "not-a-boolean" as unknown as boolean, // Type assertion for testing
-      });
-
-      const entityResult = draft.commit();
-      expect(entityResult.isErr()).toBe(true);
-
-      if (entityResult.isErr()) {
-        const { issues } = entityResult.error;
-        expect(issues.length).toBeGreaterThan(0);
-        const valueError = issues.find((issue) => issue.path.includes("value"));
-        expect(valueError).toBeDefined();
-      }
-    });
-
-    it("should create from draft", () => {
-      const draft = new BooleanSolution.Draft();
-      draft.with(validSolutionData as Record<string, unknown>);
-      const result = BooleanSolution.fromDraft(draft);
-      const entity = result._unsafeUnwrap({ withStackTrace: true });
-      expect(entity).toBeDefined();
-    });
-  });
-
   describe("Immutability", () => {
     it("should return new instance on updates", () => {
       const result = BooleanSolution.from(validSolutionData);
       expect(result.isOk()).toBe(true);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
