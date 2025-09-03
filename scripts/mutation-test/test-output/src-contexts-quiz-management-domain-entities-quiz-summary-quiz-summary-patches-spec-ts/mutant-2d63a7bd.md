# Mutant 2d63a7bd Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4685
**Stable ID**: 2d63a7bd
**Location**: L595:31–L598:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4685
@@ -591,12 +591,9 @@
       expect(result).toEqual([]);
     });
 
     it("should handle malformed input objects", () => {
-      const malformedInputs = [
-        { question: null, answerType: undefined, status: 123 },
-        { id: [], solutionId: {}, creatorId: true },
-      ];
+      const malformedInputs = [];
 
       const issues: Issue[] = [
         { path: ["question"], code: "invalid", message: "Invalid" },
         { path: ["answerType"], code: "invalid", message: "Invalid" },
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
