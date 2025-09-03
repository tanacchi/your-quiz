# Mutant e3f97710 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 6316
**Stable ID**: e3f97710
**Location**: L277:61–L277:65

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6316
@@ -273,9 +273,9 @@
     it("should create from draft", () => {
       const draft = new Tag.Draft();
       draft.with(validTagData as Record<string, unknown>);
       const result = Tag.fromDraft(draft);
-      const entity = result._unsafeUnwrap({ withStackTrace: true });
+      const entity = result._unsafeUnwrap({ withStackTrace: false });
       expect(entity).toBeDefined();
     });
   });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
