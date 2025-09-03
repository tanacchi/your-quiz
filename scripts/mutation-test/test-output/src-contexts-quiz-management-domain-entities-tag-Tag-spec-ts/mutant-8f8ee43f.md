# Mutant 8f8ee43f Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6130
**Stable ID**: 8f8ee43f
**Location**: L40:47–L53:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6130
@@ -36,22 +36,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("RelationType validation", () => {
-      it.each([
-        ["hierarchy", "hierarchy", true],
-        ["category", "category", true],
-        ["synonym", "synonym", true],
-        ["related", "related", true],
-        ["invalid type", "invalid", false],
-        ["empty string", "", false],
-        ["null value", null, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
-        const result = RelationType.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
-    });
+    describe("RelationType validation", () => {});
   });
 
   describe("Entity Creation", () => {
     it("should create valid tag from complete data", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
