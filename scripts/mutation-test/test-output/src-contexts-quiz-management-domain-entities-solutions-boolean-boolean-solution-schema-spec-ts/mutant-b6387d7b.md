# Mutant b6387d7b Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6028
**Stable ID**: b6387d7b
**Location**: L295:8–L295:62

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6028
@@ -291,9 +291,9 @@
     });
   });
 
   describe("Error Handling", () => {
-    it("should provide clear error messages for invalid data", () => {
+    it("", () => {
       const invalidCases = [
         { data: { id: "", value: true }, expectedPath: ["id"] },
         { data: { id: "valid", value: "true" }, expectedPath: ["value"] },
         { data: { id: "valid" }, expectedPath: ["value"] },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
