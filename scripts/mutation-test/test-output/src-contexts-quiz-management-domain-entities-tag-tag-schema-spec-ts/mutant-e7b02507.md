# Mutant e7b02507 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6856
**Stable ID**: e7b02507
**Location**: L40:69–L47:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6856
@@ -36,16 +36,9 @@
         ["null value", null, false],
         ["undefined value", undefined, false],
         ["number", 123, false],
         ["object", {}, false],
-      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
-        const result = TagId.safeParse(input);
-        expect(result.success).toBe(isValid);
-
-        if (isValid && result.success) {
-          expect(result.data).toBe(input);
-        }
-      });
+      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {});
     });
 
     describe("UserId", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
