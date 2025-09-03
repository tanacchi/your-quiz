# Mutant 9b55fc2e Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6131
**Stable ID**: 9b55fc2e
**Location**: L41:15–L49:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6131
@@ -37,17 +37,9 @@
       });
     });
 
     describe("RelationType validation", () => {
-      it.each([
-        ["hierarchy", "hierarchy", true],
-        ["category", "category", true],
-        ["synonym", "synonym", true],
-        ["related", "related", true],
-        ["invalid type", "invalid", false],
-        ["empty string", "", false],
-        ["null value", null, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
+      it.each([])("should handle %s: %s", (_desc, input, isValid) => {
         const result = RelationType.safeParse(input);
         expect(result.success).toBe(isValid);
       });
     });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
