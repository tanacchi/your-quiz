# Mutant be3a37a2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2452
**Stable ID**: be3a37a2
**Location**: L752:79–L767:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2452
@@ -748,24 +748,9 @@
         expect(Array.isArray(result)).toBe(true);
       });
     });
 
-    it("should preserve original input when no patches are applicable", () => {
-      const input = { ...validQuizInput };
-      const issues: Issue[] = [
-        { path: ["unknownField"], code: "invalid", message: "Invalid" },
-      ];
-
-      const patches = suggestQuizPatches(input, issues);
-      const patched = applyEntityPatches(input, patches);
-      if (typeof patched === "function") {
-        throw new Error("patched must be an object.");
-      }
-      // Should be mostly the same, except consistency patches might apply
-      expect(patched.id).toBe(input.id);
-      expect(patched.question).toBe(input.question);
-      expect(patched.answerType).toBe(input.answerType);
-    });
+    it("should preserve original input when no patches are applicable", () => {});
   });
 
   describe("Performance and Large Data Handling", () => {
     it("should handle large number of issues efficiently", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
