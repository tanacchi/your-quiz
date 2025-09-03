# Mutant ed07e4ac Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4674
**Stable ID**: ed07e4ac
**Location**: L586:17–L586:20

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4674
@@ -582,9 +582,9 @@
     });
 
     it("should handle issues with non-string paths", () => {
       const issues: Issue[] = [
-        { path: [0], code: "invalid", message: "Invalid" },
+        { path: [], code: "invalid", message: "Invalid" },
         { path: ["question", 1], code: "invalid", message: "Invalid" },
       ];
 
       const result = suggestQuizSummaryPatches(validQuizSummaryInput, issues);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
