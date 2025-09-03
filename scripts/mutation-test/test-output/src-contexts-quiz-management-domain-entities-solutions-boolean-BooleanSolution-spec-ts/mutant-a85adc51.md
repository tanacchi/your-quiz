# Mutant a85adc51 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5579
**Stable ID**: a85adc51
**Location**: L182:8–L182:51

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5579
@@ -178,9 +178,9 @@
       expect(result.isOk()).toBe(true);
       solution = result._unsafeUnwrap();
     });
 
-    it("should log NotImplemented for checkAnswer", () => {
+    it("", () => {
       const consoleSpy = vi.spyOn(console, "log");
 
       const result = solution.checkAnswer({ value: true });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
