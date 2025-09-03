# Mutant befd678e Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6300
**Stable ID**: befd678e
**Location**: L252:32–L255:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6300
@@ -248,12 +248,9 @@
 
       const entityResult = draft.commit();
       expect(entityResult.isOk()).toBe(true);
 
-      if (entityResult.isOk()) {
-        const tag = entityResult.value;
-        expect(tag.get("name")).toBe("TypeScript");
-      }
+      if (entityResult.isOk()) {}
     });
 
     it("should handle Draft validation errors", () => {
       const draft = new Tag.Draft();
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
