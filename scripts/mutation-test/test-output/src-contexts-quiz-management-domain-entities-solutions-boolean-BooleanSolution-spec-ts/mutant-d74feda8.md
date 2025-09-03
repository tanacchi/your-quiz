# Mutant d74feda8 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5474
**Stable ID**: d74feda8
**Location**: L28:37–L97:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5474
@@ -24,79 +24,10 @@
       });
     });
   });
 
-  describe("Entity Creation", () => {
-    it("should create valid boolean solution from complete data", () => {
-      const result = BooleanSolution.from(validSolutionData);
-      expect(result.isOk()).toBe(true);
+  describe("Entity Creation", () => {});
 
-      if (result.isOk()) {
-        const solution = result.value;
-        expect(solution.get("id")).toBe("solution-1");
-        expect(solution.get("value")).toBe(true);
-      }
-    });
-
-    it("should create boolean solution with false value", () => {
-      const falseData = {
-        ...validSolutionData,
-        value: false,
-      };
-
-      const result = BooleanSolution.from(falseData);
-      expect(result.isOk()).toBe(true);
-
-      if (result.isOk()) {
-        const solution = result.value;
-        expect(solution.get("value")).toBe(false);
-      }
-    });
-
-    it("should reject invalid data types", () => {
-      const invalidData = {
-        id: SolutionId.parse("solution-1"),
-        value: "not-a-boolean",
-      };
-
-      const result = BooleanSolution.from(invalidData);
-      expect(result.isErr()).toBe(true);
-
-      if (result.isErr()) {
-        const { issues } = result.error;
-        expect(issues).toHaveLength(1);
-        expect(issues[0]?.path).toEqual(["value"]);
-      }
-    });
-
-    it("should reject missing required fields", () => {
-      const incompleteData = {
-        id: SolutionId.parse("solution-1"),
-        // value is missing
-      };
-
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
-    it("should reject extra fields (strict mode)", () => {
-      const extraFieldData = {
-        ...validSolutionData,
-        extraField: "should-not-be-allowed",
-      };
-
-      const result = BooleanSolution.from(extraFieldData);
-      expect(result.isErr()).toBe(true);
-    });
-  });
-
   describe("Business Logic", () => {
     let trueSolution: BooleanSolution;
     let falseSolution: BooleanSolution;
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
