# Mutant f27a1664 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 6208
**Stable ID**: f27a1664
**Location**: L120:16–L120:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6208
@@ -116,9 +116,9 @@
 
       if (result.isErr()) {
         const { issues } = result.error;
         expect(issues).toHaveLength(1);
-        expect(issues[0]?.path).toEqual(["name"]);
+        expect(issues[0].path).toEqual(["name"]);
       }
     });
 
     it("should reject empty name", () => {
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
