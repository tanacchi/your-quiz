# Mutant 86ffa0bc Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 6315
**Stable ID**: 86ffa0bc
**Location**: L277:43–L277:67

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6315
@@ -273,9 +273,9 @@
     it("should create from draft", () => {
       const draft = new Tag.Draft();
       draft.with(validTagData as Record<string, unknown>);
       const result = Tag.fromDraft(draft);
-      const entity = result._unsafeUnwrap({ withStackTrace: true });
+      const entity = result._unsafeUnwrap({});
       expect(entity).toBeDefined();
     });
   });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
