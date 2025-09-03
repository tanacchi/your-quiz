# Mutant 09dc958a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4672
**Stable ID**: 09dc958a
**Location**: L585:31–L588:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4672
@@ -581,12 +581,9 @@
       expect(result).toEqual([]);
     });
 
     it("should handle issues with non-string paths", () => {
-      const issues: Issue[] = [
-        { path: [0], code: "invalid", message: "Invalid" },
-        { path: ["question", 1], code: "invalid", message: "Invalid" },
-      ];
+      const issues: Issue[] = [];
 
       const result = suggestQuizSummaryPatches(validQuizSummaryInput, issues);
       expect(result).toEqual([]);
     });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
