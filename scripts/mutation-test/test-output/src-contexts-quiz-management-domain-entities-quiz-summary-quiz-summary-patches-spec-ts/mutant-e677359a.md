# Mutant e677359a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4625
**Stable ID**: e677359a
**Location**: L506:12–L506:54

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4625
@@ -502,9 +502,9 @@
           expect(patched.status).toBe("pending_approval");
           expect(patched.tagIds).toEqual([]);
         });
 
-        it("should handle function patches correctly", () => {
+        it("", () => {
           const input = {
             tagIds: [
               "valid",
               "",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
