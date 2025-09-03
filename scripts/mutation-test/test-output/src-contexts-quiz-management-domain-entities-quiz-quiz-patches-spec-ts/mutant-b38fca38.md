# Mutant b38fca38 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2432
**Stable ID**: b38fca38
**Location**: L735:55–L750:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2432
@@ -731,25 +731,10 @@
       // Should still include consistency patches
       expect(Array.isArray(result)).toBe(true);
     });
 
-    it("should handle malformed input objects", () => {
-      const malformedInputs = [
-        { question: null, answerType: undefined, solution: "invalid" },
-        { id: [], creatorId: {}, solution: 123 },
-      ];
+    it("should handle malformed input objects", () => {});
 
-      const issues: Issue[] = [
-        { path: ["question"], code: "invalid", message: "Invalid" },
-        { path: ["solution"], code: "invalid", message: "Invalid" },
-      ];
-
-      malformedInputs.forEach((input) => {
-        const result = suggestQuizPatches(input, issues);
-        expect(Array.isArray(result)).toBe(true);
-      });
-    });
-
     it("should preserve original input when no patches are applicable", () => {
       const input = { ...validQuizInput };
       const issues: Issue[] = [
         { path: ["unknownField"], code: "invalid", message: "Invalid" },
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
