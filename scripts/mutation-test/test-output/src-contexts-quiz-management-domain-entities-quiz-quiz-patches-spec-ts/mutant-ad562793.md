# Mutant ad562793 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2419
**Stable ID**: ad562793
**Location**: L724:60–L733:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2419
@@ -720,19 +720,10 @@
       // Should still include consistency patches
       expect(Array.isArray(result)).toBe(true);
     });
 
-    it("should handle issues with non-string paths", () => {
-      const issues: Issue[] = [
-        { path: [0], code: "invalid", message: "Invalid" },
-        { path: ["question", 1], code: "invalid", message: "Invalid" },
-      ];
+    it("should handle issues with non-string paths", () => {});
 
-      const result = suggestQuizPatches(validQuizInput, issues);
-      // Should still include consistency patches
-      expect(Array.isArray(result)).toBe(true);
-    });
-
     it("should handle malformed input objects", () => {
       const malformedInputs = [
         { question: null, answerType: undefined, solution: "invalid" },
         { id: [], creatorId: {}, solution: 123 },
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
