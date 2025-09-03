# Mutant 0f81722d Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6079
**Stable ID**: 0f81722d
**Location**: L4:10–L4:15

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6079
@@ -1,8 +1,8 @@
 import { beforeEach, describe, expect, it } from "vitest";
 import { RelationType, Tag, TagId, UserId } from "./Tag";
 
-describe("Tag", () => {
+describe("", () => {
   const validTagData = {
     id: TagId.parse("tag-1"),
     name: "JavaScript",
     createdBy: UserId.parse("user-1"),
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
