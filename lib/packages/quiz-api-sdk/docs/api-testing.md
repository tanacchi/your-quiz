# API Testing Guide

## Step G: 実API疎通確認

### 手動確認

1. **環境設定**

   ```bash
   # .env.development
   VITE_USE_MSW=false
   ```

2. **実API接続確認**
   - アプリから `api.get...` または `safeApi.get...` を呼び出し
   - `http://localhost:8787` にアクセスすることを確認
   - 実サーバから 2xx 応答が返ることを確認

### 確認ポイント

- 実サーバから 2xx 応答が返る

---

## Step H: モック動作確認

### MSW有効化確認

1. **環境設定**

   ```bash
   # .env.development
   VITE_USE_MSW=true
   ```

2. **モック動作確認**
   - 同じAPI呼び出しを実行
   - ブラウザのNetworkタブに **"from Service Worker"** 表示を確認
   - 値がモック由来であることを確認

### 確認ポイント

- Networkタブに **from Service Worker** 表示
- 値がモック由来であることを確認
