# Mutant 56b703de Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1990
**Stable ID**: 56b703de
**Location**: L210:58–L213:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1990
@@ -206,12 +206,9 @@
           [{ status: "pending_approval" }],
         ],
         ["unknown status", "unknown_status", []],
         ["non-string input", 123, []],
-      ])("should handle %s", (_desc, input, expected) => {
-        const result = suggestStatusPatches(input);
-        expect(result).toEqual(expected);
-      });
+      ])("should handle %s", (_desc, input, expected) => {});
 
       describe("Patch Application", () => {
         it("should apply status correction patch correctly", () => {
           const input = { ...validQuizInput, status: "pending" };
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
