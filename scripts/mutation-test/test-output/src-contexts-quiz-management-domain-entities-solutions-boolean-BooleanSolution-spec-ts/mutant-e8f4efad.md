# Mutant e8f4efad Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5496
**Stable ID**: e8f4efad
**Location**: L55:50–L69:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5496
@@ -51,24 +51,10 @@
         expect(solution.get("value")).toBe(false);
       }
     });
 
-    it("should reject invalid data types", () => {
-      const invalidData = {
-        id: SolutionId.parse("solution-1"),
-        value: "not-a-boolean",
-      };
+    it("should reject invalid data types", () => {});
 
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
     it("should reject missing required fields", () => {
       const incompleteData = {
         id: SolutionId.parse("solution-1"),
         // value is missing
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
