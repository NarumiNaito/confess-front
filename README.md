# 懺悔の館（フロントエンド）

<br>
<img width="1423" alt="top" src="https://github.com/user-attachments/assets/7d0d0597-59ed-4f64-af06-4defeaf835e2">
<br>

## アプリ概要

<br>
URL ▶ <a href="https://confession.zangenoyakata.com" target="_blank" rel="noopener noreferrer">https://zangenoyakata.com/</a>
<br>
<br>

### 自分が犯した罪や過ち、心残りやわだかまりを懺悔するサービスです。

「懺悔の館」は、ユーザーが日常生活での後悔や懺悔を匿名で投稿し、他の人々と共有できるプラットフォームです。このアプリを通じて、ユーザーが自身の感情を整理したり、同じような経験を持つ人々と共感を得られる場を提供します。
<br>
<br>

## サービスを作った背景

<br>
日常生活の中で、私たちはつい何かを言い過ぎてしまったり、やるべきことを先延ばしにしたり、あるいは誰かを傷つけてしまうことがあります。これらの小さな後悔や懺悔を抱えたままだと、心に重荷を感じることも少なくはありません。

一方で、本心から悔いてる懺悔を誰かに打ち明けるのは親しい仲でも容易ではなく、匿名性を確保しつつ、感情を解放する場が求められていると感じました。また、同じような経験や体験を共有することで、「自分だけじゃない」と感じる安心感や共感を得られる場を作りたいと考え、そこで生まれたのがこの「懺悔の館」です。

このアプリは、下記の 3 つの指針からなり、

- 感情の解放
- 共感の共有
- 自分を見つめ直すきっかけの提供

「懺悔」をすることで過去の自分を受け入れ、次の一歩を踏み出すお手伝いができればと願っています。
<br>
<br>

## 各種機能について

<br>

### 1. 新規ユーザー登録 & ログインページ

- アカウント名、メールアドレス、パスワードで新規登録可能です
- 新規登録後はメールアドレス、パスワードでログイン可能です
- 試使用としてゲストログインも可能です

  <br>

<img src="https://github.com/user-attachments/assets/21c961c7-487a-496e-8170-bf4eb0ca6066" width="600px">

<br>
<br>

### 2. プロフィール登録 & 変更ページ

- アカウント名及びアカウント画像の登録・変更を行うことが可能です
- 登録した内容はアカウント情報として他のユーザーから閲覧されます

<br>

<img src="https://github.com/user-attachments/assets/270e7b1e-d70c-4cba-a55f-03de1f7ea7fc" width="600px">

<br>
<br>

### 3. 匿名投稿 & 投稿削除

- ユーザーは匿名で懺悔を投稿することができます。
- 投稿は懺悔一覧から確認することができます。
- また、ユーザーは懺悔一覧から投稿を編集及び削除することができます。

<br>

<img src="https://github.com/user-attachments/assets/882f7e46-9417-477a-a7fb-10b64fc1d7df" width="600px">

<br>

<img src="https://github.com/user-attachments/assets/06f9f70b-aae0-4064-a009-345f31511b94" width="600px">

<br>
<br>

### 4. コメント

- 他人の懺悔に対してコメントすることができます
- また、コメント主は何時でもコメントを削除することができます

<br>

<img src="https://github.com/user-attachments/assets/26d1f772-5144-42ee-9705-a17db667e114" width="600px">

<br>
<br>

### 5. 赦す

- 他人の懺悔に対し赦しを与えることができます
- また赦す機能がつくことにより懺悔が成就したものとみなされ「成就した懺悔」へ表示されます
- 自分の投稿に誰が赦しをくれたか確認することもできます

<img src="https://github.com/user-attachments/assets/c7d36774-d191-44cd-a5da-e7e49a64d474" width="600px">

<br>
<br>

### 6. カテゴリー検索

- 投稿をカテゴリー別に検索することができます。

<br>

<img src="https://github.com/user-attachments/assets/9c40ded7-e6ff-4dd8-89c5-fb12750ab913" width="600px">

<br>
<br>

### 7. ブックマーク

- 気になった懺悔に対しブックマークをつけることができます
- またブックマークした懺悔はマイページから確認することができます

<br>

<img src="https://github.com/user-attachments/assets/7f7cb192-5391-4fe0-a55b-75b60d2ed972" width="600px">

<br>
<br>

### 8. 通知

- 貴方の投稿に対し赦す及びコメントがついた場合、ベルマークに件数が表示されます
- また、通知一覧から内容を確認することができます

<br>

<img src="https://github.com/user-attachments/assets/e36b8032-a826-4ece-b833-834f22bf5f78" width="600px">

<br>
<br>

## 使用技術について

### フロントエンド

- 言語: JavaScript/TypeScript 4.9.5
- フレームワーク: React.js 18.3.1
- UI ライブラリ: Material UI 6.1.1
- UI ライブラリ: Material Icons 6.1.1
- UI ライブラリ: Framer Motion 11.11.17
- ライブラリ: React Hook Form 7.53.0
- ライブラリ: React Router 6.26.2
- ライブラリ: dayjs 1.11.5
- ライブラリ: axios 1.7.7
- API 仕様: RESTful API

### バックエンド

※ 注釈<br>
SPA 開発における GitHub のリポジトリについて、今回のアプリはフロントエンドとバックエンドを別々で作成し開発を行っています。
<br>
バックエンドのリポジトリについては下記を参照ください。
<br>
confess-api-server 参照 URL ▶ <a href="https://github.com/NarumiNaito/confess-api-server" target="_blank" rel="noopener noreferrer">https://github.com/NarumiNaito/confess-api-server</a>
<br>
<br>

## インフラ

- Docker/Docker-Compose
- AWS(Route53, CloudFront, S3, ACM, VPC, ALB, ECS, Fargate, ECR, RDS)

### インフラ構成図

<!-- <img width="638" alt="構成図" src="https://user-images.githubusercontent.com/87213148/193205719-19da2de8-806a-49a3-99fb-69c4c07de5fa.png"> -->

<br>
<br>

## ER 図

<img width="638" alt="ER図" src="https://github.com/user-attachments/assets/13d2d01e-4f08-463c-a78c-296a9ee15c0c">
