# Mutant ecca1b24 Report

**File**: src/shared/schemas/datetime.schema.ts
**Mutator**: Regex
**Original ID**: 174
**Stable ID**: ecca1b24
**Location**: L32:24–L32:63

## Diff

```diff
Index: src/shared/schemas/datetime.schema.ts
===================================================================
--- src/shared/schemas/datetime.schema.ts	original
+++ src/shared/schemas/datetime.schema.ts	mutated #174
@@ -28,9 +28,9 @@
  * SQLite/D1 datetime format regex
  * Matches: YYYY-MM-DD HH:MM:SS (space-separated format)
  * Examples: 2025-08-11 08:46:01, 2024-01-15 10:30:00
  */
-const sqliteDateTime = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
+const sqliteDateTime = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/;
 
 /**
  * Schema for validating SQLite/D1 datetime strings without transformation
  * Use this for D1 database datetime fields (CURRENT_TIMESTAMP format)
```

## Hint

ミューテータ "Regex" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。