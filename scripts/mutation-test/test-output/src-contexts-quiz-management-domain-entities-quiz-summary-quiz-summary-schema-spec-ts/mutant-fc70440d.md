# Mutant fc70440d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5068
**Stable ID**: fc70440d
**Location**: L96:71–L102:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5068
@@ -92,15 +92,9 @@
         ["empty array", [], []],
         ["null value", null, []],
         ["undefined value", undefined, []],
         ["single tag", ["tag-1"], ["tag-1"]],
-      ])("should transform %s: %s -> %s", (_desc, input, expected) => {
-        const result = TagIds.safeParse(input);
-        expect(result.success).toBe(true);
-        if (result.success) {
-          expect(result.data).toEqual(expected);
-        }
-      });
+      ])("should transform %s: %s -> %s", (_desc, input, expected) => {});
 
       it("should reject invalid tag formats in array", () => {
         const result = TagIds.safeParse(["valid-tag", "", "another-valid"]);
         expect(result.success).toBe(false);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
