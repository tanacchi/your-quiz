/**
 * SQLite型マッピング定義
 * DBML-to-SQLite変換で使用する型とENUMのマッピングテーブル
 */

export interface EnumMapping {
  name: string;
  values: string[];
}

export interface TypeMapping {
  dbmlType: string;
  sqliteType: string;
}

export interface FunctionMapping {
  postgresFunction: string;
  sqliteFunction: string;
}

/**
 * DBML ENUMからSQLite CHECK制約への変換マッピング
 */
export const enumMappings: EnumMapping[] = [
  {
    name: 'AnswerType',
    values: ['boolean', 'free_text', 'single_choice', 'multiple_choice']
  },
  {
    name: 'QuizStatus',
    values: ['pending_approval', 'approved', 'rejected']
  },
  {
    name: 'TagType',
    values: ['official', 'user']
  },
  {
    name: 'RelationType',
    values: ['hierarchy', 'category', 'synonym', 'related']
  },
  {
    name: 'MatchingStrategy',
    values: ['exact', 'partial', 'regex']
  }
];

/**
 * DBMLカスタム型からSQLite型への変換マッピング
 */
export const typeMappings: TypeMapping[] = [
  { dbmlType: 'UserAccountId', sqliteType: 'INTEGER' },
  { dbmlType: 'UserId', sqliteType: 'INTEGER' },
  { dbmlType: 'QuizId', sqliteType: 'INTEGER' },
  { dbmlType: 'SolutionId', sqliteType: 'INTEGER' },
  { dbmlType: 'ChoiceId', sqliteType: 'INTEGER' },
  { dbmlType: 'TagId', sqliteType: 'INTEGER' },
  { dbmlType: 'TagRelationId', sqliteType: 'INTEGER' },
  { dbmlType: 'QuizTagId', sqliteType: 'INTEGER' },
  { dbmlType: 'DeckId', sqliteType: 'INTEGER' },
  { dbmlType: 'SessionId', sqliteType: 'INTEGER' },
  { dbmlType: 'AnswerId', sqliteType: 'INTEGER' },
  { dbmlType: 'AttemptId', sqliteType: 'INTEGER' },
  // PostgreSQL型からSQLite型への変換
  { dbmlType: 'timestamp', sqliteType: 'DATETIME' },
  { dbmlType: 'boolean', sqliteType: 'INTEGER' },
  { dbmlType: 'int', sqliteType: 'INTEGER' },
];

/**
 * PostgreSQL関数からSQLite関数への変換マッピング
 */
export const functionMappings: FunctionMapping[] = [
  { postgresFunction: 'now()', sqliteFunction: 'CURRENT_TIMESTAMP' },
  { postgresFunction: '(now())', sqliteFunction: 'CURRENT_TIMESTAMP' },
  { postgresFunction: 'NOW()', sqliteFunction: 'CURRENT_TIMESTAMP' },
  { postgresFunction: '(NOW())', sqliteFunction: 'CURRENT_TIMESTAMP' },
];

/**
 * 配列型パターン（JSON形式に変換）
 */
export const arrayTypePattern = /(\w+)\[\]/g;

/**
 * ENUM型をSQLite CHECK制約文字列に変換
 */
export function generateCheckConstraint(columnName: string, enumName: string): string {
  const enumMapping = enumMappings.find(e => e.name === enumName);
  if (!enumMapping) {
    throw new Error(`Unknown enum type: ${enumName}`);
  }
  
  const values = enumMapping.values.map(v => `'${v}'`).join(', ');
  return `CHECK ("${columnName}" IN (${values}))`;
}

/**
 * カスタム型をSQLite型に変換
 */
export function convertCustomType(dbmlType: string): string {
  const mapping = typeMappings.find(m => m.dbmlType === dbmlType);
  return mapping ? mapping.sqliteType : dbmlType;
}

/**
 * PostgreSQL関数をSQLite関数に変換
 */
export function convertFunction(postgresFunction: string): string {
  const mapping = functionMappings.find(m => m.postgresFunction === postgresFunction);
  return mapping ? mapping.sqliteFunction : postgresFunction;
}