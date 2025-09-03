# Mutant 3d5832bb Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6211
**Stable ID**: 3d5832bb
**Location**: L124:8–L124:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6211
@@ -120,9 +120,9 @@
         expect(issues[0]?.path).toEqual(["name"]);
       }
     });
 
-    it("should reject empty name", () => {
+    it("", () => {
       const invalidData = {
         ...validTagData,
         name: "",
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
