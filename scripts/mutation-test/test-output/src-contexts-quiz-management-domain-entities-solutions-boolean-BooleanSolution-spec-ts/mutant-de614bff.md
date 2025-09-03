# Mutant de614bff Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5659
**Stable ID**: de614bff
**Location**: L298:42–L305:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5659
@@ -294,16 +294,9 @@
       expect(solution.get("id")).toBe("solution-1");
       expect(solution.get("value")).toBe(true);
     });
 
-    it("should create from draft", () => {
-      const draft = new BooleanSolution.Draft();
-      draft.with(validSolutionData as Record<string, unknown>);
-
-      const result = BooleanSolution.fromDraft(draft);
-      const entity = result._unsafeUnwrap({ withStackTrace: true });
-      expect(entity).toBeDefined();
-    });
+    it("should create from draft", () => {});
   });
 
   describe("Type Safety", () => {
     it("should enforce return type constraints", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
