# Mutant 2f801cd3 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6320
**Stable ID**: 2f801cd3
**Location**: L283:55–L298:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6320
@@ -279,22 +279,7 @@
     });
   });
 
   describe("Immutability", () => {
-    it("should return new instance on updates", () => {
-      const result = Tag.from(validTagData);
-      expect(result.isOk()).toBe(true);
-      const originalTag = result._unsafeUnwrap();
-
-      const updatedResult = originalTag.update("name", "TypeScript");
-      expect(updatedResult.isOk()).toBe(true);
-      const updatedTag = updatedResult._unsafeUnwrap();
-
-      // Different instances
-      expect(originalTag).not.toBe(updatedTag);
-      // Original unchanged
-      expect(originalTag.get("name")).toBe("JavaScript");
-      // Updated has new value
-      expect(updatedTag.get("name")).toBe("TypeScript");
-    });
+    it("should return new instance on updates", () => {});
   });
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
