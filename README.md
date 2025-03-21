# 公園管理台帳システム

![概要](./img/echigo_parkmanagement_mapandlist_2024.png)

## 更新履歴
| 更新日時     | リリース       | 更新内容                                       |
|-------------|--------------|----------------------------------------------|
| 2025/3/**  | 1st Release  | 初版リリース |


## 1. 概要 
本リポジトリでは、2024年度のProject PLATEAUで開発した「公園管理システムアプリケーション」のソースコードを公開しています。

「公園管理システムアプリケーション」は、PLATEAUの3D都市モデルを活用して管理業務をDXし、効率的なインフラ管理の実現を目指すものです。

## 2. 「公園管理システムアプリケーション」について 
「公園管理システムアプリケーション」は、3D 都市モデルを活用した公園管理用のリレーショナルデータベースマネジメントシステム（RDBMS）です。
公園管理における管理者から現場担当者への方針伝達や点検記録、「公園施設長寿命化計画」に基づく方針立案や維持保全活動の情報共有に活用することを目的としています。
本システムは、RDBMS に紐づく管理用アプリケーション（OSS化対象外）と併せた利用を想定しており、施設の管理類型や健全度・緊急度判定等を把握しながら点検や計画立案・更新等の管理業務を効率化・高度化する機能の実装を行いました。
本システムの詳細については[技術検証レポート](https://www.mlit.go.jp/plateau/file/libraries/doc/plateau_tech_doc_0091_ver01.pdf)を参照してください。

## 3. 利用手順 
本システムの構築手順及び利用手順については[利用チュートリアル](https://project-plateau.github.io/Park-facility-management-system/)を参照してください。

## 4. システム概要
### 【公園管理アプリ】
#### ①インシデントデータの表示と確認　
- 巡回点検アプリ（携帯アプリ）で取得してデータベースに登録されている、公園の遊具や施設類の異常等の状況を表示します。
- 異常があった場合は、報告時刻、施設名、異常内容と対応内容等の情報と地図へのリンクを表示します。

#### ②メータ記録データの表示　
- 巡回点検アプリ（携帯アプリ）で取得してデータベースに登録されている、「水道メータ」「水温」「塩素濃度」の点検時の値を表示します。

#### ③管理表データの表示　
- 「公園施設長寿命化計画データ」および「樹木管理台帳データ」のリストと地図を表示します。
- リストの絞り込みと地図表示が連動、地図クリックとリスト表示が連動します。

#### ④報告書の生成と表示、エクスポート　
- 巡回報告書を自動生成します。
- 生成された報告書はExcel形式でダウンロードできます。

#### ⑤ログイン管理ツール　
- ログインユーザーを登録・権限などのユーザー管理を行います。
  
### 【公園管理アプリ　施設配置シミュレーション】
#### ①新設・既存モデルの移動、配置
- 公園遊具や施設を地図上で移動させ、データベースに新たな緯度経度を登録し、地図上に表示します。
#### ①既存モデルの廃止
- 公園遊具や施設を地図上で消去し、データベースに廃止ステータスを登録し、地図上から消去します。
  
## 5. 利用技術

| 種別              | 名称   | バージョン | 内容 |
| ----------------- | --------|-------------|-----------------------------|
| オープンソースソフトウェア       | [Apache HTTP Server](https://httpd.apache.org/) | 2.4.58 | Webアプリで配信を行うためのWebサーバーソフトウェア |
|        | [PostGIS](https://github.com/postgis/postgis) | 3.4.1 | PostgreSQLで位置情報を扱うことを可能とする拡張機能 |
| オープンソースライブラリ       | [CesiumJS](https://github.com/CesiumGS/cesium) | 1.115 | 3Dビューワ上にデータを描画するためのライブラリ |
|        | [React.js](https://github.com/facebook/react/releases) | 18.2.0 | JavaScriptのフレームワーク内で機能するUIを構築するためのライブラリ |
| オープンソースRDBMS       | [PostgreSQL](https://github.com/postgres/postgres) | 16.2 | 各種配信するデータを格納するリレーショナルデータベース |
|  商用ソフトウェア       | [FME Form](https://safe.com/) | 2024.1, 2024.2 | ファイル変換などの処理およびその自動化を行う |
|        | [FME Flow](https://safe.com/) | - | FME Formで構築した処理フローをサーバーで実行する |
|        | [Cesium ion](https://cesium.com/platform/cesium-ion/) | - | 3Dデータの変換と配信のクラウドサービス |
|   商用ライブラリ      | [AG Grid](https://ag-grid.com/) | 31.1.1 | JavaScriptで集計、フィルタリング等を行うためのライブラリ |

## 6. 動作環境 
| 項目               | 最小動作環境                                                                                                                                                                                                                                                                                                                                    | 推奨動作環境                   | 
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | 
| OS                 | Microsoft Windows 10 以上　または macOS 12 Monterey 以上                                                                                                                                                                                                                                                                                                                  |  同左 | 
| CPU                | Pentium 4 以上                                                                                                                                                                                                                                                                                                                               | 同左              | 
| メモリ             | 8GB以上                                                                                                                                                                                                                                                                                                                                         | 同左                        |                  | 

## 7. 本リポジトリのフォルダ構成 
| フォルダ名               | 詳細               | 
| ------------- | ------------ | 
| img  | スクリーンショット                                                                                                                                                                                                                                                                                                                           | 
| resources  | FME Workspaceで使用する地形モデルなど
| admin-web/public  | 公園管理アプリ  publicディレクトリ                    
| admin-web/src/manager/  | 公園管理アプリ データマネージャ　　　　
| admin-web/src/resources/aggrid  | 公園管理アプリ　AgGrid用リソースファイル
| admin-web/src/resources/images  | 公園管理アプリ 画像アセット
| admin-web/src/view/root  | 公園管理アプリ ページレンダリングコンポーネント                                                                                                                                                                                                                                                                                                                     |
| admin-web/src/App.css   | 公園管理アプリ アプリ標準スタイル                                                                                                                                                                                                                                                                                                                              |
| admin-web/src/App.js  |  公園管理アプリ アプリコンポーネント                                                                                                                                                                                                                                                                                                                              |
| admin-web/src/index.css  |  公園管理アプリ　初期スタイル                                                                                                                                                                                                                                                                                                                             |
| admin-web/src/index.js  |   公園管理アプリ 　初期JS                                              |                                                                                                                                                                                                                                                                               
| relocation-web/public/cesium  | 施設配置シミュレーション機能　Cesiumライブラリ                                                                                                                                                                                                                                                                                                                      |
| relocation-websrc/src/cesium  | 施設配置シミュレーション機能　Cesiumライブラリ（開発用）                                                                                                                                                                                                                                                                                                             |
| relocation-websrc/src/data   | 施設配置シミュレーション機能 データマネージャ                                                                                                                                                                                                                                                                                                                |
| relocation-websrc/src/manager   | 施設配置シミュレーション機能　アプリ標準スタイル                                                                                                                   |
| relocation-websrc/src/map_layers   | 施設配置シミュレーション機能　マップレイヤーファイル                                                                                  |
| relocation-websrc/src/resources/images   | 施設配置シミュレーション機能　画像アセット                                                                                       |
| relocation-websrc/src/view   | 施設配置シミュレーション機能　 UIコンポーネント群                                                                                        |
| relocation-websrc/App.js  | 施設配置シミュレーション機能　アプリコンポーネント                                                                                |                                                                                                                                                                                                                          
| relocation-web/src/index.css  |  施設配置シミュレーション機能　初期スタイル                                                                                                                                                                                                                                                                                                                             | 
| relocation-web/src/index.js  |  施設配置シミュレーション機能 初期JS                                                                                                                                                                                                                                                                                                                             | 
| workspaces  |  FME Form で実行するWorkspaceとFME Flowの設定に使用するプロジェクトファイル                                                                                                                                                                                                                                                                                                                             | 

## 8. ライセンス

- ソースコード及び関連ドキュメントの著作権は国土交通省に帰属します。
- 本ドキュメントは[Project PLATEAUのサイトポリシー](https://www.mlit.go.jp/plateau/site-policy/)（CCBY4.0及び政府標準利用規約2.0）に従い提供されています。

## 9. 注意事項 

- 本リポジトリは参考資料として提供しているものです。動作保証は行っていません。
- 本リポジトリについては予告なく変更又は削除をする可能性があります。
- 本リポジトリの利用により生じた損失及び損害等について、国土交通省はいかなる責任も負わないものとします。

## 10. 参考資料
- 技術検証レポート: https://www.mlit.go.jp/plateau/file/libraries/doc/plateau_tech_doc_0091_ver01.pdf
- PLATEAU WebサイトのUse caseページ「公園管理のDX2.0」: https://www.mlit.go.jp/plateau/use-case/uc24-17/
