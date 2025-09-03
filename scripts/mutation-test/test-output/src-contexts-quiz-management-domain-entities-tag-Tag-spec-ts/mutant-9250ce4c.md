# Mutant 9250ce4c Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6217
**Stable ID**: 9250ce4c
**Location**: L135:38–L190:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6217
@@ -131,65 +131,10 @@
       expect(result.isErr()).toBe(true);
     });
   });
 
-  describe("Validation Rules", () => {
-    it("should prevent duplicate related tag IDs", () => {
-      const invalidData = {
-        ...validTagData,
-        relatedTags: [
-          {
-            relationType: "hierarchy" as const,
-            id: TagId.parse("tag-2"),
-            name: "Programming",
-          },
-          {
-            relationType: "category" as const,
-            id: TagId.parse("tag-2"),
-            name: "Programming",
-          }, // same tag ID
-        ],
-      };
+  describe("Validation Rules", () => {});
 
-      const result = Tag.from(invalidData);
-      expect(result.isErr()).toBe(true);
-
-      if (result.isErr()) {
-        const { issues } = result.error;
-        expect(
-          issues.some((issue) =>
-            issue.message.includes("Duplicate related tag IDs"),
-          ),
-        ).toBe(true);
-      }
-    });
-
-    it("should prevent self-reference", () => {
-      const selfReferencingData = {
-        ...validTagData,
-        relatedTags: [
-          {
-            relationType: "hierarchy" as const,
-            id: TagId.parse("tag-1"), // self reference
-            name: "JavaScript",
-          },
-        ],
-      };
-
-      const result = Tag.from(selfReferencingData);
-      expect(result.isErr()).toBe(true);
-
-      if (result.isErr()) {
-        const { issues } = result.error;
-        expect(
-          issues.some((issue) =>
-            issue.message.includes("cannot reference itself"),
-          ),
-        ).toBe(true);
-      }
-    });
-  });
-
   describe("Business Logic", () => {
     let tag: Tag;
 
     beforeEach(() => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
