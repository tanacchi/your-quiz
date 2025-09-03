# Mutant 64747fa1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4706
**Stable ID**: 64747fa1
**Location**: L613:31–L615:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4706
@@ -609,11 +609,9 @@
     });
 
     it("should preserve original input when no patches are applicable", () => {
       const input = { ...validQuizSummaryInput };
-      const issues: Issue[] = [
-        { path: ["unknownField"], code: "invalid", message: "Invalid" },
-      ];
+      const issues: Issue[] = [];
 
       const patches = suggestQuizSummaryPatches(input, issues);
       const patched = applyEntityPatches(input, patches);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
