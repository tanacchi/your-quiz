# Mutant 36d63aa3 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6201
**Stable ID**: 36d63aa3
**Location**: L108:51–L122:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6201
@@ -104,24 +104,10 @@
         expect(tag.get("relatedTags")).toEqual([]);
       }
     });
 
-    it("should reject invalid name length", () => {
-      const invalidData = {
-        ...validTagData,
-        name: "a".repeat(51), // exceeds 50 char limit
-      };
+    it("should reject invalid name length", () => {});
 
-      const result = Tag.from(invalidData);
-      expect(result.isErr()).toBe(true);
-
-      if (result.isErr()) {
-        const { issues } = result.error;
-        expect(issues).toHaveLength(1);
-        expect(issues[0]?.path).toEqual(["name"]);
-      }
-    });
-
     it("should reject empty name", () => {
       const invalidData = {
         ...validTagData,
         name: "",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
