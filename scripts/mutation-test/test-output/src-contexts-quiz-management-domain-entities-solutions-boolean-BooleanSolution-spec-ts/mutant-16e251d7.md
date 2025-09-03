# Mutant 16e251d7 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5618
**Stable ID**: 16e251d7
**Location**: L235:55–L252:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5618
@@ -231,27 +231,10 @@
         expect(solution.get("id")).toBe("solution-draft");
       }
     });
 
-    it("should handle Draft validation errors", () => {
-      const draft = new BooleanSolution.Draft();
-      // Test with invalid data by using with() instead of update()
-      draft.with({
-        id: SolutionId.parse("solution-draft"),
-        value: "not-a-boolean" as unknown as boolean, // Type assertion for testing
-      });
+    it("should handle Draft validation errors", () => {});
 
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
     it("should create from draft", () => {
       const draft = new BooleanSolution.Draft();
       draft.with(validSolutionData as Record<string, unknown>);
       const result = BooleanSolution.fromDraft(draft);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
