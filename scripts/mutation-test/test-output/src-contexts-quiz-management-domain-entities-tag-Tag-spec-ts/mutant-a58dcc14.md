# Mutant a58dcc14 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6303
**Stable ID**: a58dcc14
**Location**: L258:8–L258:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6303
@@ -254,9 +254,9 @@
         expect(tag.get("name")).toBe("TypeScript");
       }
     });
 
-    it("should handle Draft validation errors", () => {
+    it("", () => {
       const draft = new Tag.Draft();
       draft.update("name", ""); // invalid empty name
 
       const entityResult = draft.commit();
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
