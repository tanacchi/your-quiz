# Mutant 102ed67c Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5612
**Stable ID**: 102ed67c
**Location**: L228:32–L232:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5612
@@ -224,13 +224,9 @@
 
       const entityResult = draft.commit();
       expect(entityResult.isOk()).toBe(true);
 
-      if (entityResult.isOk()) {
-        const solution = entityResult.value;
-        expect(solution.get("value")).toBe(false);
-        expect(solution.get("id")).toBe("solution-draft");
-      }
+      if (entityResult.isOk()) {}
     });
 
     it("should handle Draft validation errors", () => {
       const draft = new BooleanSolution.Draft();
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
