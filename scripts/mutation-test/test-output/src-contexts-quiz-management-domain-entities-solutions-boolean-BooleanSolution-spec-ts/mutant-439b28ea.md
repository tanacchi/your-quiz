# Mutant 439b28ea Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5495
**Stable ID**: 439b28ea
**Location**: L55:8–L55:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5495
@@ -51,9 +51,9 @@
         expect(solution.get("value")).toBe(false);
       }
     });
 
-    it("should reject invalid data types", () => {
+    it("", () => {
       const invalidData = {
         id: SolutionId.parse("solution-1"),
         value: "not-a-boolean",
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
