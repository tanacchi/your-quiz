# Mutant 716ace0d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2449
**Stable ID**: 716ace0d
**Location**: L746:42–L749:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2449
@@ -742,12 +742,9 @@
         { path: ["question"], code: "invalid", message: "Invalid" },
         { path: ["solution"], code: "invalid", message: "Invalid" },
       ];
 
-      malformedInputs.forEach((input) => {
-        const result = suggestQuizPatches(input, issues);
-        expect(Array.isArray(result)).toBe(true);
-      });
+      malformedInputs.forEach((input) => {});
     });
 
     it("should preserve original input when no patches are applicable", () => {
       const input = { ...validQuizInput };
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
