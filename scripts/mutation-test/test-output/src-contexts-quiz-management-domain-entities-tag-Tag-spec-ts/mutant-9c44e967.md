# Mutant 9c44e967 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6207
**Stable ID**: 9c44e967
**Location**: L117:27–L121:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6207
@@ -113,13 +113,9 @@
 
       const result = Tag.from(invalidData);
       expect(result.isErr()).toBe(true);
 
-      if (result.isErr()) {
-        const { issues } = result.error;
-        expect(issues).toHaveLength(1);
-        expect(issues[0]?.path).toEqual(["name"]);
-      }
+      if (result.isErr()) {}
     });
 
     it("should reject empty name", () => {
       const invalidData = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
