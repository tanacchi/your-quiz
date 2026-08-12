import "@testing-library/jest-dom";
// jsdom は IndexedDB を実装しないため、テスト用実装を全テストに適用する
import "fake-indexeddb/auto";
