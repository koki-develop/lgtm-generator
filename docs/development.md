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
direnv allow
```

```sh
# .env
STAGE=local
ALLOW_ORIGIN=http://localhost:3000
IMAGES_BASE_URL=http://localhost:9000/lgtm-generator-backend-local-images
SLACK_API_TOKEN=xxxx # Slack API のアクセストークン
GOOGLE_API_KEY=xxxx # GCP で発行した API キー
GOOGLE_CUSTOM_SEARCH_ENGINE_ID=xxxx # Google カスタム検索エンジン ID
```

### minio, dynamodb を起動

```sh
docker compose up
```

### API を起動

```sh
air
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
