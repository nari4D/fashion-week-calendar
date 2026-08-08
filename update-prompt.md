Update data.json in the root of this repository by checking each fashion week's official website. Edit data.json only. Always save valid JSON. This calendar is now ENGLISH — every human-readable value you write must be in English.

Today's date is provided by the runner; treat any deadline/period earlier than today as already passed.

What to do:
1. Read data.json (it has an `events` array and a `pins` array).
2. For each event, open its `link` (official site) with WebFetch / WebSearch, confirm the facts, and update:
   - If dates are confirmed, update `dateJP` to the official dates and set `status` to `open` (only if the official site confirms accreditation is currently open) or `amber` (dates confirmed but accreditation not yet open / not yet announced).
   - If the accreditation/registration deadline has passed and no second-round call is announced, OR the event period itself is over, set `status` to `closed`.
   - If the next edition's dates are not officially announced, keep `status` as `tbd` and keep/refresh `est` (estimated period) and `ref` (last year's reference).
   - Match each event's season naming to the official wording (NY = "Spring 2027" etc.; European September = SS27; Japan = S/S or A/W; Korea = "2027 S/S"). Update `name` when the season rolls over.
   - Update `acc` (accreditation / shooting note) to the latest official situation.
3. DATE FORMAT: write every date as dotted numerals `YYYY.M.D`, joined with `〜`, e.g. `2026.8.31〜9.5`, `2026.9.28〜10.6`, single day `2026.10.19`. Do NOT use English month names (no "Sep 1 2026"). This applies to `dateJP`, and to any explicit dates you put inside `est` / `acc` / `ref` / `reason`.
4. Do NOT change pin coordinates (`x, y, lx, ly, a, c, k`). Only sync each pin's `s` (colour) to the matching key's event status (`open` / `amber` / `closed` / `tbd`). Keep pin label `c` (city name) in English.
5. Update `generated` to today's date (YYYY-MM-DD).

Rules:
- No fabrication. Write as confirmed only what you verified on the official site. Leave anything unconfirmed / unannounced as an estimate (`tbd` + `est` + `ref`). Do not use aggregator-site dates.
- Do not add or remove elements or keys in `events` / `pins`. Keep the existing structure and key names (including the legacy key name `dateJP`, even though values are English).
- Keep everything in English. Never write Japanese into any value.
- Do not break the JSON (always end with valid JSON).
- If nothing changed, leave data.json as-is (don't force edits).
