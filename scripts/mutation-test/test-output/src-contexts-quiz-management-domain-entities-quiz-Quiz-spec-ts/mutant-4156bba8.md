# Mutant 4156bba8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 964
**Stable ID**: 4156bba8
**Location**: L75:27–L86:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #964
@@ -71,20 +71,9 @@
 
       const result = Quiz.from(invalidData);
       expect(result.isErr()).toBe(true);
 
-      if (result.isErr()) {
-        const { issues, patches } = result.error;
-        expect(issues.length).toBeGreaterThan(0);
-        expect(patches.length).toBeGreaterThan(0);
-
-        // patches contains question fix
-        const hasQuestionPatch = patches.some(
-          (patch) =>
-            typeof patch === "object" && patch !== null && "question" in patch,
-        );
-        expect(hasQuestionPatch).toBe(true);
-      }
+      if (result.isErr()) {}
     });
 
     it("should enforce answer type consistency", () => {
       const inconsistentData = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
