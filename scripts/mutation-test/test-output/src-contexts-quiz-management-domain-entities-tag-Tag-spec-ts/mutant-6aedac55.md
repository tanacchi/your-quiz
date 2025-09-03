# Mutant 6aedac55 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6290
**Stable ID**: 6aedac55
**Location**: L240:48–L256:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6290
@@ -236,26 +236,10 @@
     });
   });
 
   describe("Draft Usage", () => {
-    it("should work with Draft pattern", () => {
-      const draft = new Tag.Draft();
-      draft.update("name", "TypeScript");
-      draft.with({
-        id: TagId.parse("tag-typescript"),
-        createdBy: UserId.parse("user-1"),
-        createdAt: "2023-12-01 10:00:00",
-      });
+    it("should work with Draft pattern", () => {});
 
-      const entityResult = draft.commit();
-      expect(entityResult.isOk()).toBe(true);
-
-      if (entityResult.isOk()) {
-        const tag = entityResult.value;
-        expect(tag.get("name")).toBe("TypeScript");
-      }
-    });
-
     it("should handle Draft validation errors", () => {
       const draft = new Tag.Draft();
       draft.update("name", ""); // invalid empty name
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
