このリポジトリ直下の data.json を、各ファッションウィークの公式サイトを調べて最新化してください。編集対象は data.json のみ。作業後は必ず有効なJSONとして保存すること。

やること:
1. data.json を読む（events 配列と pins 配列がある）。
2. events の各項目について、その項目の link（公式サイト）を WebFetch / WebSearch で実際に確認し、最新化する。
   - 会期が確定していれば dateJP を公式の日付に更新し、status を open（アクレディ受付中と公式で確認できた場合）または amber（会期は確定だが受付前・未告知）にする。
   - **トップページだけで「告知なし」と判断しない。** 必ず各サイトの「Register / Accreditation / プレス登録」専用ページまで開き、PRESS・PHOTOGRAPHER 向けの申請期間（신청기간／registration period／accreditation window）を確認する。今日がその期間内なら status=open にする。（例：Seoul は https://www.seoulfashionweek.org/hmpg/fawk/regi/regiMain.do に「PRESS 신청기간 2026-07-31~2026-08-15」と明記。トップだけ見て見落とすと amber のまま誤表示になる。）
   - アクレディ／登録の締切が過ぎ、二次募集の告知が無い（が会期はまだ先）の場合は status を "closed"（アクレディ受付終了）にする。
   - **会期そのものが終了した（終了日 < 今日）イベントは closed のままにせず、翌年の同シーズンの予定へ繰り上げる。** kind を "estimate"、status を "tbd" にし、name を翌年シーズンに更新（SS27→SS28、AW27→AW28 等）、dateJP と acc は削除、est（前年実績＋1年の推定会期）・ref（今終わった回の実績）・reason を設定する。**sort を翌年の日付（例 20270803）に更新し、時系列リストの一番下へ移動させる。** 同じ key のピン s は "tbd"。（例：Copenhagen SS27 が 2026-08-07 に終了 → SS28 推定・sort=20270803 に繰り上げ。）
   - 次回会期が公式未発表の項目は status を "tbd" のままにし、est（推定会期）と ref（前年実績の参考）を保持・必要なら更新する。
   - 季節名は各公式の呼称に合わせる（NY=「Spring 2027」等の Spring/Fall＋西暦、欧州9月開催=SS27、日本=S/S・A/W、韓国=2027 S/S 等）。季節が繰り上がったら name を更新。
   - acc（アクレディ/撮影メモ）も公式の最新状況に更新。
3. pins 配列は座標（x, y, lx, ly, a, c, k）を絶対に変更しない。各 pin の s（色）だけを、同じ key を持つ event の status に一致させる（open/amber/closed/tbd）。
4. data.json の generated を今日の日付（YYYY-MM-DD）に更新する。

厳守:
- 捏造禁止。公式サイトで確認できた事実だけを確定として書く。確認できないもの・未発表は推定（tbd＋est＋ref）のままにする。まとめサイトの日付は使わない。
- events / pins の要素数や key を増減させない。既存の構造・キー名を保つ。
- JSONとして壊さない（最後に必ず妥当なJSONで保存）。
- 変更が無ければ data.json はそのままでよい（無理に書き換えない）。
