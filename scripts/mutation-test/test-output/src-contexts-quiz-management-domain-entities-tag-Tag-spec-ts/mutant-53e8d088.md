# Mutant 53e8d088 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6305
**Stable ID**: 53e8d088
**Location**: L260:20–L260:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6305
@@ -256,9 +256,9 @@
     });
 
     it("should handle Draft validation errors", () => {
       const draft = new Tag.Draft();
-      draft.update("name", ""); // invalid empty name
+      draft.update("", ""); // invalid empty name
 
       const entityResult = draft.commit();
       expect(entityResult.isErr()).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
