# Mutant c6786ef5 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6556
**Stable ID**: c6786ef5
**Location**: L225:12–L225:64

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6556
@@ -221,9 +221,9 @@
           expect(patched.createdBy).toBe(input.createdBy);
           expect(patched.createdAt).toBe(input.createdAt);
         });
 
-        it("should preserve other fields when applying patches", () => {
+        it("", () => {
           const input = {
             id: "tag-typescript",
             name: "TypeScript Programming",
             createdBy: "user-expert",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
