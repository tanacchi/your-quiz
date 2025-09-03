# Mutant f3a9eae5 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6890
**Stable ID**: f3a9eae5
**Location**: L65:15–L73:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6890
@@ -61,17 +61,9 @@
       });
     });
 
     describe("RelationType", () => {
-      it.each([
-        ["hierarchy", "hierarchy", true],
-        ["category", "category", true],
-        ["synonym", "synonym", true],
-        ["related", "related", true],
-        ["invalid type", "invalid_type", false],
-        ["empty string", "", false],
-        ["null value", null, false],
-      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
+      it.each([])("should validate %s: %s -> %s", (_desc, input, isValid) => {
         const result = RelationType.safeParse(input);
         expect(result.success).toBe(isValid);
       });
     });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
