# Mutant dbc01916 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7305
**Stable ID**: dbc01916
**Location**: L508:10–L508:16

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7305
@@ -504,9 +504,9 @@
         ["spaces", "Programming Language"],
         ["numbers", "TypeScript 4.9"],
         ["hyphens", "Front-End"],
         ["underscores", "Snake_Case"],
-        ["dots", "Node.js"],
+        ["", "Node.js"],
       ])("should accept name with %s", (_desc, name) => {
         const data = { ...validTagData, name };
         const result = TagSchema.safeParse(data);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
