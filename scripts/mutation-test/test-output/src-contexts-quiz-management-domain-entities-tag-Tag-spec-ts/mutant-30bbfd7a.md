# Mutant 30bbfd7a Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6200
**Stable ID**: 30bbfd7a
**Location**: L108:8–L108:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6200
@@ -104,9 +104,9 @@
         expect(tag.get("relatedTags")).toEqual([]);
       }
     });
 
-    it("should reject invalid name length", () => {
+    it("", () => {
       const invalidData = {
         ...validTagData,
         name: "a".repeat(51), // exceeds 50 char limit
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
