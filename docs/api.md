# API ドキュメント

## 認証

### Strava OAuth認証

#### GET /auth/strava
Stravaの認証ページにリダイレクトします。

#### GET /auth/callback
Stravaからのコールバックを処理し、JWTトークンを発行します。

**レスポンス**
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string"
  }
}
```

#### POST /auth/refresh
アクセストークンを更新します。

**レスポンス**
```json
{
  "token": "string"
}
```

#### POST /auth/logout
ログアウトを実行します。

## アクティビティ

### GET /activities
アクティビティ一覧を取得します。

**クエリパラメータ**
- `page`: ページ番号 (デフォルト: 1)
- `limit`: 1ページあたりの件数 (デフォルト: 20)

**レスポンス**
```json
{
  "items": [
    {
      "id": "string",
      "name": "string",
      "distance": "number",
      "movingTime": "number",
      "elapsedTime": "number",
      "totalElevationGain": "number",
      "startDate": "string",
      "type": "string"
    }
  ],
  "total": "number",
  "page": "number",
  "limit": "number"
}
```

### GET /activities/:id
アクティビティの詳細を取得します。

**レスポンス**
```json
{
  "id": "string",
  "name": "string",
  "distance": "number",
  "movingTime": "number",
  "elapsedTime": "number",
  "totalElevationGain": "number",
  "startDate": "string",
  "type": "string",
  "segments": [
    {
      "id": "string",
      "name": "string",
      "distance": "number",
      "averageGrade": "number",
      "maximumGrade": "number",
      "elevationHigh": "number",
      "elevationLow": "number",
      "elapsedTime": "number"
    }
  ]
}
```

## セグメント

### GET /segments
セグメント一覧を取得します。

**クエリパラメータ**
- `page`: ページ番号 (デフォルト: 1)
- `limit`: 1ページあたりの件数 (デフォルト: 20)
- `sort`: ソート順 (name, distance, grade)
- `order`: 昇順/降順 (asc, desc)

**レスポンス**
```json
{
  "items": [
    {
      "id": "string",
      "name": "string",
      "distance": "number",
      "averageGrade": "number",
      "maximumGrade": "number",
      "elevationHigh": "number",
      "elevationLow": "number",
      "efforts": "number"
    }
  ],
  "total": "number",
  "page": "number",
  "limit": "number"
}
```

### GET /segments/:id
セグメントの詳細を取得します。

**レスポンス**
```json
{
  "id": "string",
  "name": "string",
  "distance": "number",
  "averageGrade": "number",
  "maximumGrade": "number",
  "elevationHigh": "number",
  "elevationLow": "number",
  "efforts": "number",
  "activities": [
    {
      "id": "string",
      "name": "string",
      "elapsedTime": "number",
      "startDate": "string",
      "clothing": "string",
      "wheels": "string",
      "wind": "string",
      "weight": "number"
    }
  ]
}
```

### GET /segments/search
セグメントを検索します。

**クエリパラメータ**
- `clothing`: 服装
- `wheels`: ホイール
- `wind`: 風
- `weight`: 体重

**レスポンス**
```json
[
  {
    "id": "string",
    "name": "string",
    "distance": "number",
    "averageGrade": "number",
    "maximumGrade": "number",
    "elevationDifference": "number",
    "clothing": "string",
    "wheels": "string",
    "wind": "string",
    "weight": "number",
    "bestTime": "number"
  }
]
```

## テンプレート

### GET /templates
テンプレート一覧を取得します。

**レスポンス**
```json
[
  {
    "id": "string",
    "name": "string",
    "clothing": "string",
    "wheels": "string",
    "wind": "string",
    "weight": "number",
    "notes": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

### POST /templates
テンプレートを作成します。

**リクエストボディ**
```json
{
  "name": "string",
  "clothing": "string",
  "wheels": "string",
  "wind": "string",
  "weight": "number",
  "notes": "string"
}
```

### PUT /templates/:id
テンプレートを更新します。

**リクエストボディ**
```json
{
  "name": "string",
  "clothing": "string",
  "wheels": "string",
  "wind": "string",
  "weight": "number",
  "notes": "string"
}
```

### DELETE /templates/:id
テンプレートを削除します。

## ユーザー

### GET /users/me
ユーザー情報を取得します。

**レスポンス**
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "weight": "number"
}
```

### PUT /users/me/weight
体重を更新します。

**リクエストボディ**
```json
{
  "weight": "number"
}
``` 