# SEG-LINK

セグメントのパフォーマンスを分析・管理するアプリケーション

## 技術スタック

### フロントエンド
- React + Vite
- TypeScript
- TailwindCSS
- React Query
- React Router DOM

### バックエンド
- Node.js + Express
- TypeScript
- Prisma
- PostgreSQL
- Redis + BullMQ

## 環境構築

1. リポジトリのクローン
```bash
git clone [repository-url]
cd seg-link
```

2. 環境変数の設定
```bash
cp .env.example .env
cp frontend/.env.local.example frontend/.env.local
```

3. 依存関係のインストール
```bash
# ルートディレクトリ
npm install

# フロントエンド
cd frontend
npm install

# バックエンド
cd backend
npm install
```

4. Docker環境の起動
```bash
docker-compose up -d
```

5. データベースのマイグレーション
```bash
cd backend
npx prisma migrate dev
```

6. 開発サーバーの起動
```bash
# フロントエンド（別ターミナル）
cd frontend
npm run dev

# バックエンド（別ターミナル）
cd backend
npm run dev
```

## 開発フロー

1. 新機能開発時
```bash
git checkout -b feature/[feature-name]
```

2. バグ修正時
```bash
git checkout -b hotfix/[bug-name]
```

3. コミットメッセージ規約
- feat: 新機能
- fix: バグ修正
- docs: ドキュメント
- style: コードスタイル
- refactor: リファクタリング
- test: テストコード
- chore: その他

4. プルリクエスト
- develop ブランチをターゲットに作成
- レビュー後にマージ

## ライセンス

[ライセンス情報]
