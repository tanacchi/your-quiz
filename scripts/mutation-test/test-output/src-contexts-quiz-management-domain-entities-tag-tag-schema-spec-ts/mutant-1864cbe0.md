# Mutant 1864cbe0 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6889
**Stable ID**: 1864cbe0
**Location**: L64:36–L77:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6889
@@ -60,22 +60,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("RelationType", () => {
-      it.each([
-        ["hierarchy", "hierarchy", true],
-        ["category", "category", true],
-        ["synonym", "synonym", true],
-        ["related", "related", true],
-        ["invalid type", "invalid_type", false],
-        ["empty string", "", false],
-        ["null value", null, false],
-      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
-        const result = RelationType.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
-    });
+    describe("RelationType", () => {});
   });
 
   describe("TagSchema Validation", () => {
     describe("Required Fields", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
