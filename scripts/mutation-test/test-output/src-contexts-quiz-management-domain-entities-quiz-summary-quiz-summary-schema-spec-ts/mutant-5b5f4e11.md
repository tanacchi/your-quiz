# Mutant 5b5f4e11 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5041
**Stable ID**: 5b5f4e11
**Location**: L89:30–L108:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5041
@@ -85,28 +85,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("TagIds", () => {
-      it.each([
-        ["valid array", ["tag-1", "tag-2"], ["tag-1", "tag-2"]],
-        ["empty array", [], []],
-        ["null value", null, []],
-        ["undefined value", undefined, []],
-        ["single tag", ["tag-1"], ["tag-1"]],
-      ])("should transform %s: %s -> %s", (_desc, input, expected) => {
-        const result = TagIds.safeParse(input);
-        expect(result.success).toBe(true);
-        if (result.success) {
-          expect(result.data).toEqual(expected);
-        }
-      });
-
-      it("should reject invalid tag formats in array", () => {
-        const result = TagIds.safeParse(["valid-tag", "", "another-valid"]);
-        expect(result.success).toBe(false);
-      });
-    });
+    describe("TagIds", () => {});
   });
 
   describe("QuizSummarySchema Validation", () => {
     describe("Required Fields", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
