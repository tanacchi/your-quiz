# Mutant 5fb17e5b Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5627
**Stable ID**: 5fb17e5b
**Location**: L254:8–L254:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5627
@@ -250,9 +250,9 @@
         expect(valueError).toBeDefined();
       }
     });
 
-    it("should create from draft", () => {
+    it("", () => {
       const draft = new BooleanSolution.Draft();
       draft.with(validSolutionData as Record<string, unknown>);
       const result = BooleanSolution.fromDraft(draft);
       const entity = result._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
