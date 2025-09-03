# Mutant 6d0140ba Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6231
**Stable ID**: 6d0140ba
**Location**: L156:27–L163:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6231
@@ -152,16 +152,9 @@
 
       const result = Tag.from(invalidData);
       expect(result.isErr()).toBe(true);
 
-      if (result.isErr()) {
-        const { issues } = result.error;
-        expect(
-          issues.some((issue) =>
-            issue.message.includes("Duplicate related tag IDs"),
-          ),
-        ).toBe(true);
-      }
+      if (result.isErr()) {}
     });
 
     it("should prevent self-reference", () => {
       const selfReferencingData = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
