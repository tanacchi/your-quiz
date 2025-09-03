# Mutant eca1499b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1560
**Stable ID**: eca1499b
**Location**: L849:27–L858:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1560
@@ -845,17 +845,8 @@
       });
 
       expect(result.isErr()).toBe(true);
 
-      if (result.isErr()) {
-        const statusPatch = result.error.patches.find(
-          (patch) =>
-            typeof patch === "object" && patch !== null && "status" in patch,
-        );
-        expect(statusPatch).toBeDefined();
-        if (statusPatch && "status" in statusPatch) {
-          expect(statusPatch.status).toBe("pending_approval");
-        }
-      }
+      if (result.isErr()) {}
     });
   });
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
