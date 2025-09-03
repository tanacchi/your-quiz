# Mutant 82ce44cd Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2420
**Stable ID**: 82ce44cd
**Location**: L725:31–L728:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2420
@@ -721,12 +721,9 @@
       expect(Array.isArray(result)).toBe(true);
     });
 
     it("should handle issues with non-string paths", () => {
-      const issues: Issue[] = [
-        { path: [0], code: "invalid", message: "Invalid" },
-        { path: ["question", 1], code: "invalid", message: "Invalid" },
-      ];
+      const issues: Issue[] = [];
 
       const result = suggestQuizPatches(validQuizInput, issues);
       // Should still include consistency patches
       expect(Array.isArray(result)).toBe(true);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
