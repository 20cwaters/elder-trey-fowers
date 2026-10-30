/* ============================================================
   MISSION CONFIG  —  edit this file to update the facts.
   Anything marked TODO is a guess or a blank you should fill in.
   ============================================================ */

window.MISSION = {

  missionary: {
    firstName: "Trey",
    lastName: "Fowers",
    title: "Elder",
    get fullName() { return this.title + " " + this.firstName + " " + this.lastName; },
    email: "trey.fowers@missionary.org",
    portrait: "photos/trey.jpg",             // drop his mission photo here
    tagline: "Serving in Southern California, one '¡hola!' at a time.",
    homeWard: "Inverness Ward",
    farewellDate: ""                         // TODO: optional, YYYY-MM-DD
  },

  mission: {
    name: "California Arcadia Spanish-Speaking Mission",
    shortName: "Arcadia",
    country: "USA",
    language: "Spanish",
    languageNative: "Español",
    presidentName: "",                       // TODO: "President & Sister ____"
    officeAddress: [                         // TODO: confirm the street address from the mission office
      "California Arcadia Spanish-Speaking Mission",
      "USA"
    ],
    mapCenter: [34.1397, -118.0353],         // Arcadia, California
    mapZoom: 7,
    // Rough box around the eastern Los Angeles basin and San Gabriel Valley,
    // centred on Arcadia. The mission's real boundaries are not confirmed.
    // Decorative only.
    boundsHint: [[34.6, -118.6], [33.6, -117.2]]
  },

  dates: {
    mtcStart: "2026-08-20",                  // entered the Mexico City MTC (CCM)
    manilaMtcStart: "",                      // only used if he moves to a second MTC
    fieldStart: "2026-09-16",                // expected arrival in the field
    release: "2028-07-20",                   // expected release / homecoming
    transferLength: 6                        // weeks per transfer
  },

  links: {
    // The shared album for his mission photos
    googlePhotos: "https://photos.app.goo.gl/Wo7EJweL5sHLkcdq8",
    // Mission Control's friends' form (posts only), linked from the Family &
    // Friends page. Everything sent is reviewed before it goes up. The parents
    // have their own form with more options; that link is not on the site.
    friendsPost: "https://mission-forms.watersleecasey.workers.dev/post/o7tMHt8mRbLXA49uSuLLZc9q"
  },

  /* ------------------------------------------------------------
     GOOGLE MAPS
     Paste your Maps JavaScript API key below and the map page turns
     on. See "Setting up the map" in README.md for how to get one.
     Until a key is here, the page shows a friendly notice instead of
     a broken map. The key is visible in the page source — that is
     normal for Google Maps — so restrict it by website in the Google
     Cloud console once the site is deployed.
     ------------------------------------------------------------ */
  maps: {
    apiKey: "AIzaSyAFgOVCbW4-VKrasthQZ4g2PvMfPcQm0J4",           // <-- paste the key between the quotes
    defaultZoom: 17,      // how close the map starts. 15 = neighbourhood, 18 = rooftops
    mapType: "hybrid"     // "hybrid" = satellite with street names, "satellite" = imagery only
  },

  /* ------------------------------------------------------------
     AREAS — add a new entry every time he gets transferred.
     Set `current: true` on exactly one, and give the previous one
     an `end` date. Look up lat/lng by searching the town on
     Google Maps and copying the two numbers from the URL.
     ------------------------------------------------------------ */
  areas: [
    {
      name: "Mexico CCM",
      region: "Mexico City, Mexico",
      type: "mtc",
      start: "2026-08-20",
      end: null,
      lat: 19.53811,                         // Mexico City MTC campus (Gustavo A. Madero) — from Wikipedia, verify on a map
      lng: -99.15320,
      companion: "",
      note: "",
      current: true
    }
  ]
};
