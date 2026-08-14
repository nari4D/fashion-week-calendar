Update data.json in the root of this repository by checking each fashion week's official website. Edit data.json only. Always save valid JSON. The scroll list is now in ENGLISH — every human-readable value you write (name, city, country, dateJP, acc, est, ref, reason) must be in English.

Today's date is provided by the runner; treat any deadline/period earlier than today as already passed.

What to do:
1. Read data.json (it has an `events` array and a `pins` array).
2. For each event, open its `link` (official site) with WebFetch / WebSearch, confirm the facts, and update:
   - If dates are confirmed, update `dateJP` to the official dates and set `status` to `open` (only if accreditation is currently open) or `amber` (dates confirmed but accreditation not yet open / announced).
   - DO NOT decide "not announced" from the top page alone. Always open each site's "Register / Accreditation / press registration" page and check the PRESS / PHOTOGRAPHER application period (registration/accreditation window). If today falls within it, set `status` = open. (e.g. Seoul lists "PRESS period 2026.7.31–2026.8.15" at https://www.seoulfashionweek.org/hmpg/fawk/regi/regiMain.do — missing that leaves it wrongly at amber.)
   - If the accreditation/registration deadline has passed with no second-round call, but the event itself is still upcoming, set `status` = `closed`.
   - If the event itself has ended (end date < today), roll it to next year's same season: set `kind` = "estimate", `status` = "tbd", update `name` to the next season (SS27→SS28, AW27→AW28, etc.), delete `dateJP` and `acc`, set `est` (estimated dates from last year + 1 year), `ref` (the edition that just finished), and `reason`. Set `sort` to next year's date (e.g. 20270803) so it moves to the bottom of the list. Set the matching pin's `s` to "tbd".
   - If the next edition's dates are not officially announced, keep `status` = `tbd` with `est` + `ref`.
   - Match season naming to official wording (NY = "Spring 2027", European September = SS27, Japan = S/S or A/W, Korea = "2027 S/S"). Update `name` when the season rolls over.
   - Update `acc` to the latest official situation.
3. DATE FORMAT: write every date as dotted numerals `YYYY.M.D`, joined with `〜`, e.g. `2026.8.31〜9.5`, `2026.9.28〜10.6`, single day `2026.10.19`. Do NOT use English month names. Applies to `dateJP` and to any explicit dates inside `est` / `acc` / `ref` / `reason`.
4. Do NOT change pin coordinates (`x, y, lx, ly, a, c, k`). Only sync each pin's `s` (colour) to the matching key's event status (`open` / `amber` / `closed` / `tbd`). Keep pin label `c` (city name) in English.
5. Update `generated` to today's date (YYYY-MM-DD).

Rules:
- No fabrication. Write as confirmed only what you verified on the official site. Leave anything unconfirmed / unannounced as an estimate (`tbd` + `est` + `ref`). Do not use aggregator-site dates.
- Do not add or remove elements or keys in `events` / `pins`. Keep the existing structure and key names (including the legacy key name `dateJP`, even though values are English).
- Keep everything in English. Never write Japanese into any value.
- Do not break the JSON (always end with valid JSON).
- If nothing changed, leave data.json as-is.
