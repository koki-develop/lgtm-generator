# アーキテクチャ

![](./architecture.png)

# 開発環境構築

```sh
git clone git@github.com:koki-develop/lgtm-generator.git
cd lgtm-generator
```

## バックエンド

```sh
cd backend
```

### `.env` を作成

```
cp .env.template .env
```

```sh
# .env
GOOGLE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx # GCP で発行した API キー
GOOGLE_CUSTOM_SEARCH_ENGINE_ID=xxxxxxxxxxxxxxxxx # Google カスタム検索エンジン ID
NOTIFICATION_SLACK_ACCESS_TOKEN=xoxb-xxxxxxxxxxxx-xxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx # Slack API のアクセストークン
```

### 開発用 Docker イメージを準備

```sh
docker compose build
```

### ローカルで API を起動

```sh
docker compose up
```

### デプロイ

```
yarn install --check-files
yarn run deploy
```

## フロントエンド

```
cd frontend
```

### `.env` を作成

```sh
cp .env.template .env
```

### 依存パッケージをインストール

```
yarn install --check-files
```

### ローカルで起動

```
yarn run dev
```
