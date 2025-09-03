# Mutant f77e1739 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6314
**Stable ID**: f77e1739
**Location**: L273:42–L279:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6314
@@ -269,15 +269,9 @@
         expect(nameError).toBeDefined();
       }
     });
 
-    it("should create from draft", () => {
-      const draft = new Tag.Draft();
-      draft.with(validTagData as Record<string, unknown>);
-      const result = Tag.fromDraft(draft);
-      const entity = result._unsafeUnwrap({ withStackTrace: true });
-      expect(entity).toBeDefined();
-    });
+    it("should create from draft", () => {});
   });
 
   describe("Immutability", () => {
     it("should return new instance on updates", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
