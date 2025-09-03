# Mutant 7d6164ff Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5492
**Stable ID**: 7d6164ff
**Location**: L49:26–L52:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5492
@@ -45,12 +45,9 @@
 
       const result = BooleanSolution.from(falseData);
       expect(result.isOk()).toBe(true);
 
-      if (result.isOk()) {
-        const solution = result.value;
-        expect(solution.get("value")).toBe(false);
-      }
+      if (result.isOk()) {}
     });
 
     it("should reject invalid data types", () => {
       const invalidData = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
