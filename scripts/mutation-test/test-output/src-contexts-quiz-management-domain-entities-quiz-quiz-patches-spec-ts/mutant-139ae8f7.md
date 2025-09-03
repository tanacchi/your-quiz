# Mutant 139ae8f7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2433
**Stable ID**: 139ae8f7
**Location**: L736:31–L739:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2433
@@ -732,12 +732,9 @@
       expect(Array.isArray(result)).toBe(true);
     });
 
     it("should handle malformed input objects", () => {
-      const malformedInputs = [
-        { question: null, answerType: undefined, solution: "invalid" },
-        { id: [], creatorId: {}, solution: 123 },
-      ];
+      const malformedInputs = [];
 
       const issues: Issue[] = [
         { path: ["question"], code: "invalid", message: "Invalid" },
         { path: ["solution"], code: "invalid", message: "Invalid" },
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
