# 環境構築手順書

# 1 本書について

本書では、公園管理システムアプリケーション（以下「本システム」という。）の利用環境構築手順について記載しています。本システムの構成や仕様の詳細については以下も参考にしてください。

[技術検証レポート](https://www.mlit.go.jp/plateau/file/libraries/doc/xxxxxx)

# 2 動作環境

本変換ツールの動作環境は以下のとおりです。

| 項目               | 最小動作環境                                                                                                                                                                                                                                                                                                                                    | 推奨動作環境                   | 
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | 
| 仮想サーバー                 | Amazon EC2 t2.small 以上                                                                                                                                                                                                                                                                                                                  |  同左 | 
  
  公園施設CityGMLを本システムに投入するためのFMEワークスペースの実行環境は下記のとおりです。
  
| 項目               | 最小動作環境                                                                                                                                                                                                                                                                                                                                    | 推奨動作環境                   | 
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | 
| OS                 | Microsoft Windows 10 以上　または macOS 12 Monterey 以上                                                                                                                                                                                                                                                                                                                  |  同左 | 
| CPU                | Pentium 4 以上                                                                                                                                                                                                                                                                                                                               | 同左              | 
| メモリ             | 8GB以上                                                                                                                                                                                                                                                                                                                                         | 同左                        |                  | 
| ネットワーク       | 【変換・作成】<br>変換したデータ（3DTiles等）の格納先（AWS S3、PostgreSQL）にアクセスできる環境が必要                            | 



# 3 事前準備

本システムで利用する下記の商用、オープンソースのソフトウェアおよびデータベースを準備します。

（1）データベースの準備

[こちら](https://github.com/postgres/postgres)を利用してPostgreSQLサーバを起動します。その上で、位置情報を扱うための拡張機能である[PostGIS](https://github.com/postgis/postgis)をインストールします。

（2）ウェブサーバの準備

[こちら](https://httpd.apache.org/)を利用してウェブサーバを起動します。

（3）FME Formの準備

[こちら](https://safe.com/)を利用してFME Formを起動します。
尚、FME Formは、商用のソフトウェアです。業務目的で利用するには、ライセンスの購入が必要です。新規ライセンスの購入については、Pacific Spatial Solutions 株式会社（Safe Software の公式パートナー）にお問い合わせください。
FME Flowの起動ができたら、以下の手順で本システムを稼働させるためのセットアップをしてください。

（4）Amazon S3の準備

[こちら](https://aws.amazon.com/jp/s3/)からAmazon S3のアカウントを取得し、本システムで使用するためのバケットを作成します。一つの公園を対象とする場合はstandardで十分ですが、ご利用になるデータサイズに応じたサイズのバケットを選択してください。


# 4 インストール手順
（1）ウェブサーバにコードを配置

[こちら](https://github.com/Project-PLATEAU/Park-facility-management-system/tree/main/admin-web/src)から公園管理アプリケーションのコードをダウンロードします。
施設配置シミュレーション機能を利用する場合は、[こちら](https://github.com/Project-PLATEAU/Park-facility-management-system/tree/main/relocation-web/src)からコードをダウンロードします。
展開したファイルを 3（2）で準備したウェブサーバのwebrootに配置します。

（2）環境変数の設定

下記の通り、環境変数を設定します。.envファイルとしてプロジェクトルートに配置してください。

`REACT_APP_API_ENDPOINT=<APIのURL>`<br>
`REACT_APP_MEDIA_ENDPOINT=<画像や音声の保存パス>`<br>
`REACT_APP_AG_GRID_LICENSE_KEY=<AG Gridのライセンスキー>`<br>
`REACT_APP_3DTILES_ENDPOINT=<3DTilesの保存パス>`


# 5 初期データの投入

本システムの稼働に必要なデータを投入します。

（1）初期データの登録：PostgreSQLへの格納

・公園施設CityGMLデータ

　[こちら](https://github.com/Project-PLATEAU/Park-facility-management-system/blob/main/workspaces/)のワークスペース（fn002）をFME Formで実行してください。実行の際にはPostgreSQLへの接続情報を求めるプロンプトが表示されますので、これに従って、入力してください。入力データはPLATEAUの3D都市モデル標準製品仕様書の規則に従ったCityGML形式のデータとします。 

| 属性項目                                   | フィールド名                      | type    |
|-------------------------------------------|----------------------------------|--------|
| gml:id                                     | gml_id                            | text    |
| 公園コード                                 | park_code                         | text    |
| 公園名                                     | park_name                         | text    |
| 公園種別                                   | park_type                         | text    |
| 施設コード                                 | facility_code                     | text    |
| 公園施設種類【選択】                       | facility_type                     | text    |
| 公園施設名【選択】                         | facility_name                     | text    |
| 公園施設名（任意）                         | facility_name_optional            | text    |
| 具体的施設名称                             | specific_facility_name            | text    |
| 数量（数値）                               | quantity_numeric                  | numeric |
| 数量（単位【選択】)                        | quantity_unit_choice              | text    |
| 規模                                       | size                              | text    |
| 主要部材【選択】                           | main_material                     | text    |
| 主要部材（任意）                           | main_material_optional            | numeric |
| 設置年度                                   | installation_year                 | numeric |
| 経過年数                                   | elapsed_years                     | numeric |
| 処分制限期間など                           | disposal_limit_period             | numeric |
| 使用見込み期間                             | expected_usage_period             | numeric |
| 健全度調査以前に実施した補修の有無（有無） | repairs_before_healthcheck_exists | numeric |
| 健全度調査以前に実施した補修の有無（年度） | repairs_before_healthcheck_year   | numeric |
| 健全度調査（年度）                         | health_check_year                 | numeric |
| 健全度調査（劣化状況）                     | health_check_deterioration_status | text    |
| 健全度調査（健全度）                       | health_check_condition            | text    |
| 健全度調査（緊急度）                       | health_check_urgency              | text    |
| 管理類型                                   | management_type                   | text    |
| 対策を踏まえた更新見込み年度               | updated_year_with_measures        | numeric |
| 対策費用・2020年（千円）                   | cost_2020_thousand_yen            | numeric |
| 対策内容・2020年                           | content_2020                      | text    |
| 対策費用・2021年（千円）                   | cost_2021_thousand_yen            | numeric |
| 対策内容・2021年                           | content_2021                      | text    |
| 対策費用・2022年（千円）                   | cost_2022_thousand_yen            | numeric |
| 対策内容・2022年                           | content_2022                      | text    |
| 対策費用・2023年（千円）                   | cost_2023_thousand_yen            | numeric |
| 対策内容・2023年                           | content_2023                      | text    |
| 対策費用・2024年（千円）                   | cost_2024_thousand_yen            | numeric |
| 対策内容・2024年                           | content_2024                      | text    |
| 対策費用・2025年（千円）                   | cost_2025_thousand_yen            | numeric |
| 対策内容・2025年                           | content_2025                      | text    |
| 対策費用・2026年（千円）                   | cost_2026_thousand_yen            | numeric |
| 対策内容・2026年                           | content_2026                      | text    |
| 対策費用・2027年（千円）                   | cost_2027_thousand_yen            | numeric |
| 対策内容・2027年                           | content_2027                      | text    |
| 対策費用・2028年（千円）                   | cost_2028_thousand_yen            | numeric |
| 対策内容・2028年                           | content_2028                      | text    |
| 対策費用・2029年（千円）                   | cost_2029_thousand_yen            | numeric |
| 対策内容・2029年                           | content_2029                      | text    |
| 長寿命化に向けた特記事項                   | note_for_longevity                | text    |

地下埋設物

| 属性項目                    | フィールド名                                | データ型   |
|----------------------------|--------------------------------------------|-----------|
| gml:id                | gml_id                                      | text       |
| 地下埋設物等施設ID          | underground_facility_id                     | text       |
| 識別名称                    | identification_name                         | text       |
| 設備種別【選択】            | facility_type_selection                     | text       |
| 設備種別【任意】            | facility_type_optional                      | text       |
| 管種【選択】                | pipe_type_selection                         | text       |
| 管種【任意】                | pipe_type_optional                          | text       |
| 土被り(m)                   | soil_cover_depth_meters                     | numeric    |
| 推定判別_土被り             | estimated_soil_cover_depth                  | boolean    |
| 最大土被り(m)               | maximum_soil_cover_depth_meters             | numeric    |
| 推定判別_最大土被り         | estimated_maximum_soil_cover_depth          | boolean    |
| 最小土被り(m)               | minimum_soil_cover_depth_meters             | numeric    |
| 推定判別_最小土被り         | estimated_minimum_soil_cover_depth          | boolean    |
| 上流側管底高(m)             | upstream_pipe_bottom_elevation_meters       | numeric    |
| 推定判別_上流側管底高       | estimated_upstream_pipe_bottom_elevation    | boolean    |
| 下流側管底高(m)             | downstream_pipe_bottom_elevation_meters     | numeric    |
| 推定判別_下流側管底高       | estimated_downstream_pipe_bottom_elevation  | boolean    |
| 延長(m)                     | pipe_length_meters                          | numeric    |
| 推定判別_延長               | estimated_pipe_length                       | boolean    |
| 内径(mm)                    | inner_diameter_millimeters                  | numeric    |
| 推定判別_内径               | estimated_inner_diameter                    | boolean    |
| 外径(mm)                    | outer_diameter_millimeters                  | numeric    |
| 推定判別_外径               | estimated_outer_diameter                    | boolean    |
| 内径B(mm)                   | inner_diameter_b_millimeters                | numeric    |
| 内径H(mm)                   | inner_diameter_h_millimeters                | numeric    |
| 外径B(mm)                   | outer_diameter_b_millimeters                | numeric    |
| 外径H(mm)                   | outer_diameter_h_millimeters                | numeric    |
| 条数                        | number_of_sections                          | numeric    |
| 角型人孔長辺サイズ(mm)      | rectangular_manhole_long_side_millimeters   | numeric    |
| 推定判別_角型人孔長辺サイズ | estimated_rectangular_manhole_long_side     | boolean    |
| 角型人孔短辺サイズ(mm)      | rectangular_manhole_short_side_millimeters  | numeric    |
| 推定判別_角型人孔短辺サイズ | estimated_rectangular_manhole_short_side    | boolean    |
| 円形人孔内径(mm)            | circular_manhole_inner_diameter_millimeters | numeric    |
| 推定判別_円形人孔内径       | estimated_circular_manhole_inner_diameter   | boolean    |
| 人孔底部レベル(m)           | manhole_bottom_level_meters                 | numeric    |
| 推定判別_人孔底部レベル     | estimated_manhole_bottom_level              | boolean    |
| 人孔上部レベル(m)           | manhole_top_level_meters                    | numeric    |
| 推定判別_人孔上部レベル     | estimated_manhole_top_level                 | boolean    |
| 人孔内高(mm)                | manhole_inner_height_millimeters            | numeric    |
| 推定判別_人孔内高           | estimated_manhole_inner_height              | boolean    |
| 工事年度(西暦)              | construction_year                           | numeric    |
| 工事番号                    | construction_code                           | text       |
| データが作成された日        | citygml_creation_date                       | date       |


（2）表示用データの登録：Amazon S3への格納

（1）でPostgreSQLに格納した公園施設CityGMLテーブルと公共測量成果の精度を満たさない地物を生成するためのデータ（Shapeファイル、OBJファイル、CSVファイル）を入力データとして、[こちら](https://github.com/Project-PLATEAU/Park-facility-management-system/blob/main/workspaces/fn002_可視化用データ変換処理.fmw)のワークスペースをFME Formで実行してください。実行の際には、以下の入力データの指定と。PostgreSQLおよびS3への接続情報をそれぞれプロンプトに従って入力してください。

