# Mutant df6159cd Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6304
**Stable ID**: df6159cd
**Location**: L258:55–L271:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6304
@@ -254,23 +254,10 @@
         expect(tag.get("name")).toBe("TypeScript");
       }
     });
 
-    it("should handle Draft validation errors", () => {
-      const draft = new Tag.Draft();
-      draft.update("name", ""); // invalid empty name
+    it("should handle Draft validation errors", () => {});
 
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
     it("should create from draft", () => {
       const draft = new Tag.Draft();
       draft.with(validTagData as Record<string, unknown>);
       const result = Tag.fromDraft(draft);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
