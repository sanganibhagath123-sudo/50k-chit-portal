50K CHIT PORTAL - FILES (anni okate folder lo)
==============================================
index.html              -> main app
firebase-config.js      -> Firebase connection (k-chit-d0394)
firestore.rules         -> security rules (Firebase Console -> Firestore -> Rules lo paste cheyyali)
SETUP-FIREBASE.txt      -> Firebase setup steps (MUNDU IDHI CHADAVANDI)
manifest.webmanifest    -> "Add to Home Screen" app details
sw.js                   -> app install / offline support
icon-192.png, icon-512.png, icon-maskable-512.png, apple-touch-icon.png -> app icons

GITHUB UPLOAD
- Repo -> Add file -> Upload files -> ee folder lo unna ANNI files select chesi drag cheyandi -> Commit changes.

LAPTOP LO TEST
  Ee folder lo terminal open chesi:   python -m http.server 8080
  Browser lo:                          http://localhost:8080
  (Laptop test ki Firebase -> Authentication -> Settings -> Authorized domains lo "localhost" already untundi)

KOTHA VERSION UPDATE
- GitHub lo kotha files upload chesthe chalu. App DELETE / REINSTALL avasaram ledu.
- GitHub Pages ki 1-2 nimishalu padutundi. Tarvata:
    * Sign-in screen lo unte app taane reload ayi kotha version vastundi.
    * Login ayi unte paina "🆕 New version available → Update now" vastundi. Nokkithe chalu (logout avvaru).
    * App close chesi malli open chesina kotha version ne open avtundi.
- App ICON / PERU maarchinappudu matrame: Android lo 1 roju varaku paata icon kanipinchavachu;
  iPhone lo icon maarchali ante remove chesi malli "Add to Home Screen" cheyyali.
