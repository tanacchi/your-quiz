# Mutant dc43061a Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6237
**Stable ID**: dc43061a
**Location**: L166:47–L189:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6237
@@ -162,32 +162,9 @@
         ).toBe(true);
       }
     });
 
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
+    it("should prevent self-reference", () => {});
   });
 
   describe("Business Logic", () => {
     let tag: Tag;
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
