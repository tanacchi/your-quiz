# Mutant a237b1b6 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6212
**Stable ID**: a237b1b6
**Location**: L124:42–L132:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6212
@@ -120,17 +120,9 @@
         expect(issues[0]?.path).toEqual(["name"]);
       }
     });
 
-    it("should reject empty name", () => {
-      const invalidData = {
-        ...validTagData,
-        name: "",
-      };
-
-      const result = Tag.from(invalidData);
-      expect(result.isErr()).toBe(true);
-    });
+    it("should reject empty name", () => {});
   });
 
   describe("Validation Rules", () => {
     it("should prevent duplicate related tag IDs", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
