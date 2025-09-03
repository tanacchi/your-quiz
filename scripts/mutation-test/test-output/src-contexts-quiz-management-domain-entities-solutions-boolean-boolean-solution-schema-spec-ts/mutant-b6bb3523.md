# Mutant b6bb3523 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 6034
**Stable ID**: b6bb3523
**Location**: L297:34–L297:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6034
@@ -293,9 +293,9 @@
 
   describe("Error Handling", () => {
     it("should provide clear error messages for invalid data", () => {
       const invalidCases = [
-        { data: { id: "", value: true }, expectedPath: ["id"] },
+        { data: { id: "", value: false }, expectedPath: ["id"] },
         { data: { id: "valid", value: "true" }, expectedPath: ["value"] },
         { data: { id: "valid" }, expectedPath: ["value"] },
         { data: { value: true }, expectedPath: ["id"] },
         { data: {}, expectedPath: ["id"] },
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
