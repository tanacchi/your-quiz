# Mutant 9cc7f397 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5561
**Stable ID**: 9cc7f397
**Location**: L152:28–L156:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5561
@@ -148,13 +148,9 @@
       it("should negate false to true", () => {
         const result = falseSolution.negate();
         expect(result.isOk()).toBe(true);
 
-        if (result.isOk()) {
-          const negated = result.value;
-          expect(negated.get("value")).toBe(true);
-          expect(negated.isTrue()).toBe(true);
-        }
+        if (result.isOk()) {}
       });
 
       it("should return new instance (immutability)", () => {
         const result = trueSolution.negate();
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
