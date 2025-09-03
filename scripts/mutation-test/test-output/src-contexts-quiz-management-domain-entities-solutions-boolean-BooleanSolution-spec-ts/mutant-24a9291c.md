# Mutant 24a9291c Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5503
**Stable ID**: 24a9291c
**Location**: L64:27–L68:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5503
@@ -60,13 +60,9 @@
 
       const result = BooleanSolution.from(invalidData);
       expect(result.isErr()).toBe(true);
 
-      if (result.isErr()) {
-        const { issues } = result.error;
-        expect(issues).toHaveLength(1);
-        expect(issues[0]?.path).toEqual(["value"]);
-      }
+      if (result.isErr()) {}
     });
 
     it("should reject missing required fields", () => {
       const incompleteData = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
