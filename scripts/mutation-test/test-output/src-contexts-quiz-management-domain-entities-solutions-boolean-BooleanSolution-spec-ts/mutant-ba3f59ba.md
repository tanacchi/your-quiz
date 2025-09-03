# Mutant ba3f59ba Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5514
**Stable ID**: ba3f59ba
**Location**: L80:27–L85:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5514
@@ -76,14 +76,9 @@
 
       const result = BooleanSolution.from(incompleteData);
       expect(result.isErr()).toBe(true);
 
-      if (result.isErr()) {
-        const { issues } = result.error;
-        expect(issues.length).toBeGreaterThan(0);
-        const valueError = issues.find((issue) => issue.path.includes("value"));
-        expect(valueError).toBeDefined();
-      }
+      if (result.isErr()) {}
     });
 
     it("should reject extra fields (strict mode)", () => {
       const extraFieldData = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
