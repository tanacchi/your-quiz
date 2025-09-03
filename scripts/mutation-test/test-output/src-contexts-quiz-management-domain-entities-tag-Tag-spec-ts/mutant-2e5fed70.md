# Mutant 2e5fed70 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6313
**Stable ID**: 2e5fed70
**Location**: L273:8–L273:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6313
@@ -269,9 +269,9 @@
         expect(nameError).toBeDefined();
       }
     });
 
-    it("should create from draft", () => {
+    it("", () => {
       const draft = new Tag.Draft();
       draft.with(validTagData as Record<string, unknown>);
       const result = Tag.fromDraft(draft);
       const entity = result._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
