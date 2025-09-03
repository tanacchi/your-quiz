# Mutant d2b77823 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6366
**Stable ID**: d2b77823
**Location**: L12:9–L12:18

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6366
@@ -8,9 +8,9 @@
 import type { TagInput } from "./tag-schema";
 
 describe("Tag Patches", () => {
   const validTagInput: TagInput = {
-    id: "tag-123",
+    id: "",
     name: "TypeScript",
     createdBy: "user-456",
     createdAt: "2023-12-01T10:00:00.000Z",
     relatedTags: [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
