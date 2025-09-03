# Mutant 31edd1f5 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6363
**Stable ID**: 31edd1f5
**Location**: L10:10–L10:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6363
@@ -6,9 +6,9 @@
 } from "../../../../../shared/validation/entity/utils";
 import { suggestRelatedTagsPatches, suggestTagPatches } from "./tag-patches";
 import type { TagInput } from "./tag-schema";
 
-describe("Tag Patches", () => {
+describe("", () => {
   const validTagInput: TagInput = {
     id: "tag-123",
     name: "TypeScript",
     createdBy: "user-456",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
