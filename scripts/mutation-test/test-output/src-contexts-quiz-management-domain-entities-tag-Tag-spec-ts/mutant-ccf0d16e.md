# Mutant ccf0d16e Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6288
**Stable ID**: ccf0d16e
**Location**: L239:33–L280:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6288
@@ -235,51 +235,10 @@
       expect(tag.hasRelationWith(TagId.parse("tag-999"))).toBe(false);
     });
   });
 
-  describe("Draft Usage", () => {
-    it("should work with Draft pattern", () => {
-      const draft = new Tag.Draft();
-      draft.update("name", "TypeScript");
-      draft.with({
-        id: TagId.parse("tag-typescript"),
-        createdBy: UserId.parse("user-1"),
-        createdAt: "2023-12-01 10:00:00",
-      });
+  describe("Draft Usage", () => {});
 
-      const entityResult = draft.commit();
-      expect(entityResult.isOk()).toBe(true);
-
-      if (entityResult.isOk()) {
-        const tag = entityResult.value;
-        expect(tag.get("name")).toBe("TypeScript");
-      }
-    });
-
-    it("should handle Draft validation errors", () => {
-      const draft = new Tag.Draft();
-      draft.update("name", ""); // invalid empty name
-
-      const entityResult = draft.commit();
-      expect(entityResult.isErr()).toBe(true);
-
-      if (entityResult.isErr()) {
-        const { issues } = entityResult.error;
-        expect(issues.length).toBeGreaterThan(0);
-        const nameError = issues.find((issue) => issue.path.includes("name"));
-        expect(nameError).toBeDefined();
-      }
-    });
-
-    it("should create from draft", () => {
-      const draft = new Tag.Draft();
-      draft.with(validTagData as Record<string, unknown>);
-      const result = Tag.fromDraft(draft);
-      const entity = result._unsafeUnwrap({ withStackTrace: true });
-      expect(entity).toBeDefined();
-    });
-  });
-
   describe("Immutability", () => {
     it("should return new instance on updates", () => {
       const result = Tag.from(validTagData);
       expect(result.isOk()).toBe(true);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
