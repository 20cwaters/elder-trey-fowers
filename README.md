# Elder Trey Fowers — Mission Site

A plain static website. No build step, no server, no dependencies to install. Open
`index.html` in a browser and it works.

> **Looking for the full picture?** [HOW-IT-WORKS.md](HOW-IT-WORKS.md) documents every page,
> the data schemas, the weekly automation, the photo pipeline, deployment and troubleshooting.
> This README is the quick how-to.

---

## Weekly routine — the automatic way

Mission Control runs the weekly update. When a new email from him arrives it saves the email and
its photos, then follows [`automation/update-playbook.md`](automation/update-playbook.md): it
writes the letter and photos into the data files, and updates `data/mission.js` when he announces
a new companion, a transfer, or arrival in the field. Edit the playbook to change its behaviour.

Extra pictures can be dropped into **`photos/_inbox/`**. The update matches each picture to its
caption by looking at what is in the photo, files them under the right names, and moves the
originals into `_inbox/_filed/`.

### Photos get optimized automatically

Straight off a phone his photos are 3–8 MB each. The automation runs the optimizer after filing
them, and you can run it yourself any time:

```bash
npm run optimize
```

It writes a web-sized version (`photos/NAME.jpg`, max 1600px) plus a thumbnail
(`photos/thumbs/NAME.jpg`, max 500px), and the site uses the thumbnails for grids and the full
version in the lightbox. It also bakes EXIF rotation into the pixels so nothing appears sideways,
and strips metadata including GPS coordinates — worth having off a public site full of pictures
of where someone lives.

Untouched originals are kept in `photos/_inbox/_filed/`, which git ignores. The script is safe to
re-run and skips anything already done. Typical saving is about 90%.

This needs the one dev dependency in `package.json`; run `npm install` once if you ever move the
project to a new machine. The site itself still has no build step.

---

## Weekly routine — the manual way

Still here as a fallback, or for weeks you'd rather do it yourself.

1. Open **`admin.html`** in your browser.
2. Paste his email — subject, date, and the whole body including the captions at the bottom.
3. Click **Read the email**. Check the paragraphs, tick which one is the spiritual thought,
   tidy the captions, add any Spanish words.
4. Copy the first snippet into **`data/letters.js`**, right after `window.LETTERS = [`.
5. Copy the second snippet into **`data/photos.js`**, right after `window.PHOTOS = [`.
6. Save his photos into the **`photos/`** folder using the filenames the admin page lists
   (`2026-08-25-1.jpg`, `2026-08-25-2.jpg`, and so on).
7. Refresh the site. Done — homepage, letters, thoughts, photos and countdown all update.

Until a photo file exists you will see a labelled placeholder tile showing the exact filename
it is waiting for. Nothing breaks.

---

## When he gets transferred

Edit **`data/mission.js`**. Give the area he is leaving an `end` date and `current: false`,
then add the new one:

```js
{
  name: "<area name>",
  region: "<city>, California",
  type: "area",
  start: "YYYY-MM-DD",
  end: null,
  lat: null,        // from Google Maps, e.g. 34.1397
  lng: null,        // e.g. -118.0353
  companion: "",
  note: "",
  current: true
}
```

To get `lat` / `lng`: search the town on Google Maps, right-click the spot, and click the
numbers at the top of the menu to copy them.

The map, the "right now" card, the transfer counter and the timeline all read from this list.

---

## Setting up the map

The map page uses Google Maps so you get real satellite imagery and Street View. Google requires
an API key, and requires a billing account on the project before it will issue one — but a family
site sits far inside the free tier, so the actual bill stays at $0. Google will not charge you
without you explicitly upgrading.

Until you paste a key in, the map page shows a short "needs a key" notice and everything else on
that page still works.

### Getting the key — about 15 minutes

1. Go to <https://console.cloud.google.com/> and sign in with your Google account.
2. At the top of the page, click the project dropdown, then **New Project**. Name it something
   like `elder-trey-fowers-mission-site` and click **Create**. Wait for it to finish, then make sure that
   new project is the one selected in the dropdown.
3. In the search bar at the top, search for **Billing** and open it. Click **Link a billing
   account** → **Create billing account**, and enter a card. This is the step Google requires;
   nothing gets charged at this usage level.
4. Search for **Maps JavaScript API** and open it. Click **Enable**. (This is the specific API the
   site uses — enabling the whole "Maps Platform" is not enough.)
5. Go to **APIs & Services → Credentials** → **Create credentials** → **API key**.
6. Copy the key it shows you.
7. Open `data/mission.js`, find the `maps` section near the top, and paste the key between the
   quotes:

   ```js
   maps: {
     apiKey: "AIzaSy...your key here...",
     defaultZoom: 17,
     mapType: "hybrid"
   },
   ```

8. Refresh `map.html`. The satellite map and Street View should both appear.

### Locking the key down

The key is visible in the page source. That is normal and expected for Google Maps, but you
should restrict it so nobody else can run up usage on your project:

1. In **Credentials**, click your key.
2. Under **Application restrictions**, choose **Websites**.
3. Add the addresses the site runs from. While testing locally add `http://localhost:*/*`, and
   once it is published add your real domain, e.g. `https://<site>.netlify.app/*`.
4. Under **API restrictions**, choose **Restrict key** and tick only **Maps JavaScript API**.
5. Save. Changes can take a few minutes to take effect.

If the map shows "Google rejected the map key", it is almost always one of: billing not enabled,
the Maps JavaScript API not switched on, or the current address missing from the website
restrictions.

### Map settings you can change

In `data/mission.js` under `maps`:

- `defaultZoom` — how close the map starts. `15` is a neighbourhood, `17` is the default, `18`
  is rooftops. Individual areas can override this with their own `zoom` value.
- `mapType` — `"hybrid"` is satellite with street names on top; `"satellite"` is pure imagery;
  `"roadmap"` is the plain map.

Street View coverage can be patchy in places. If Google has never driven an area, the
Street View panel says so and suggests dragging the orange pegman onto a nearby road instead.

---

## Things to fill in when you know them

Everything below is marked `TODO` in `data/mission.js`:

- `manilaMtcStart` — only if he moves to a second MTC (the key keeps its template name). Setting
  it adds a countdown to the homepage.
- `fieldStart` — his first day in the actual mission field. Setting it switches the homepage
  from "Week N at the MTC" to "Transfer N, week N of 6" and starts the six-week transfer clock.
- `presidentName`, `officeAddress` — for the About page.
- `farewellDate` — optional.
- His MTC companion's name, in the `areas` list.

The homepage portrait is **`photos/trey.jpg`**.

---

## Files

```
index.html      Homepage — countdown, current area, latest letter, recent photos, Spanish corner
letters.html    Every letter, searchable, with that week's photos attached
thoughts.html   Just the spiritual thoughts and scriptures
photos.html     Full gallery, grouped by week or by place, with a lightbox
map.html        Leaflet map of his areas, current assignment, transfer timeline
about.html      Mission facts, how to write him, Spanish glossary, missionary-life FAQ
admin.html      The paste-an-email tool (not linked in the main nav)

data/mission.js The facts: dates, mission, areas. Edit this on transfers.
data/letters.js His emails.
data/photos.js  Photo captions and filenames.
photos/         The image files themselves.
assets/         CSS and the shared JavaScript.
```

---

## Publishing

The site lives at `https://github.com/<github-user>/<repo>` and deploys to Netlify
(`https://<site>.netlify.app`)
automatically. **Anything pushed to `main` goes live within a minute or two.** There is no build
step — `netlify.toml` tells Netlify to serve the repository root as-is.

The weekly automation commits and pushes on its own, so a new letter publishes itself. To push a
change you made by hand:

```bash
git add -A && git commit -m "What changed" && git push
```

### Connecting Netlify to the repo

If the Netlify site was created by dragging the folder, it is not yet linked to GitHub and will
not auto-update. To link it:

1. Open your site in <https://app.netlify.com>.
2. **Site configuration → Build & deploy → Continuous deployment** → **Link repository**.
3. Choose GitHub, authorise it, and pick `<github-user>/<repo>`.
4. Branch `main`, build command empty, publish directory `.` — `netlify.toml` already sets these.
5. Deploy. From then on every push rebuilds the site.

### A note on case

Netlify serves from Linux, which is case-sensitive, unlike Windows. `photo.JPG` and `photo.jpg`
are different files there. Always name photo files with a lowercase `.jpg`, or they will work on
your machine and 404 on the live site.
