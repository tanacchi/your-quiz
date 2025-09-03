# Mutant 2fc37dcf Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5072
**Stable ID**: 2fc37dcf
**Location**: L99:29–L101:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5072
@@ -95,11 +95,9 @@
         ["single tag", ["tag-1"], ["tag-1"]],
       ])("should transform %s: %s -> %s", (_desc, input, expected) => {
         const result = TagIds.safeParse(input);
         expect(result.success).toBe(true);
-        if (result.success) {
-          expect(result.data).toEqual(expected);
-        }
+        if (result.success) {}
       });
 
       it("should reject invalid tag formats in array", () => {
         const result = TagIds.safeParse(["valid-tag", "", "another-valid"]);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
