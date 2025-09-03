# Mutant 912d9f53 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5508
**Stable ID**: 912d9f53
**Location**: L71:55–L86:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5508
@@ -67,25 +67,10 @@
         expect(issues[0]?.path).toEqual(["value"]);
       }
     });
 
-    it("should reject missing required fields", () => {
-      const incompleteData = {
-        id: SolutionId.parse("solution-1"),
-        // value is missing
-      };
+    it("should reject missing required fields", () => {});
 
-      const result = BooleanSolution.from(incompleteData);
-      expect(result.isErr()).toBe(true);
-
-      if (result.isErr()) {
-        const { issues } = result.error;
-        expect(issues.length).toBeGreaterThan(0);
-        const valueError = issues.find((issue) => issue.path.includes("value"));
-        expect(valueError).toBeDefined();
-      }
-    });
-
     it("should reject extra fields (strict mode)", () => {
       const extraFieldData = {
         ...validSolutionData,
         extraField: "should-not-be-allowed",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
