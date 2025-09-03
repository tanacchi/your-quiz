# Mutant 0ee42b56 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6802
**Stable ID**: 0ee42b56
**Location**: L12:10–L12:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6802
@@ -8,9 +8,9 @@
   TagSchema,
   UserId,
 } from "./tag-schema";
 
-describe("Tag Schema", () => {
+describe("", () => {
   const validTagData: TagInput = {
     id: "tag-123",
     name: "TypeScript",
     createdBy: "user-456",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
