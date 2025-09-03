# Mutant 5bf0dadb Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 5619
**Stable ID**: 5bf0dadb
**Location**: L238:18–L241:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5619
@@ -234,12 +234,9 @@
 
     it("should handle Draft validation errors", () => {
       const draft = new BooleanSolution.Draft();
       // Test with invalid data by using with() instead of update()
-      draft.with({
-        id: SolutionId.parse("solution-draft"),
-        value: "not-a-boolean" as unknown as boolean, // Type assertion for testing
-      });
+      draft.with({});
 
       const entityResult = draft.commit();
       expect(entityResult.isErr()).toBe(true);
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
