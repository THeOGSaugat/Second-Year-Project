# Infinity Fitness — Week 3 Wireframes (Balsamiq Guide)

This folder contains the **wireframe plan** for the Week 3 screens of Infinity Fitness.

| File | What it is |
|---|---|
| `BALSAMIQ_GUIDE.md` | This guide: how to build each screen in Balsamiq |
| `01-homepage-desktop.svg` … `07-member-dashboard.svg` | **Reference sketches** to copy from |

> **Important:** The `.svg` files are simple reference drawings made to guide the Balsamiq work.
> They are **not** Balsamiq project files. The final wireframes should be built in Balsamiq
> using the steps below, and then exported from Balsamiq (see section 5).

Open any `.svg` file in a web browser (double-click it, or drag it into Chrome) to view it.
The black numbered circles (①, ②, …) match the numbered notes in section 4.

---

## 1. Scope of these wireframes

Only the **Week 3** screens are included:

| # | Screen | URL in the app | Who can open it |
|---|---|---|---|
| 01 | Homepage — desktop | `/` | Everyone (public) |
| 02 | Homepage — mobile | `/` | Everyone (public) |
| 03 | Login | `/login` | Everyone (public) |
| 04 | Admin dashboard | `/admin` | Admin only |
| 05 | Admin — User Accounts (create Trainer/Member) | `/admin/users` | Admin only |
| 06 | Trainer dashboard | `/trainer` | Trainer only |
| 07 | Member dashboard | `/member` | Member only |

There is **no Sign Up / Register screen**, because accounts are created only by the Admin.

The dashboards are intentionally small. In Week 3 they only prove that login, session and
role-based access work (they show the logged-in user's name, email and role, and a Logout button).
Business modules (memberships, payments, attendance, workouts, etc.) come in later weeks.

---

## 2. Setting up the Balsamiq project

1. Open Balsamiq (Balsamiq Cloud or Balsamiq Wireframes desktop).
2. Create a new project named **Infinity Fitness – Week 3 Wireframes**.
3. Create 7 wireframes and name them exactly like the files:
   `01 Homepage Desktop`, `02 Homepage Mobile`, `03 Login`, `04 Admin Dashboard`,
   `05 Admin User Accounts`, `06 Trainer Dashboard`, `07 Member Dashboard`.
4. Skin: keep the default **Wireframe (sketch) skin**, or switch to the **Clean skin**
   (Project Settings) if you prefer a more formal look for the report. Use one skin for all screens.
5. Keep everything **grayscale**. Wireframes show *layout and content*, not colours.

### Screen sizes

| Screen type | Container control | Size |
|---|---|---|
| Desktop pages (01, 03–07) | **Browser Window** | width **1280** (height as needed) |
| Mobile page (02) | **iPhone** / mobile container (or a Rectangle 375 wide) | width **375** |

Type the page URL into the Browser Window's address bar (for example `/login`),
so it is clear which route each screen belongs to.

### Re-using the dashboard header (Symbols)

Screens 04–07 share the same top bar. Build it once, then:
select the controls → right-click → **Convert to Symbol** → name it `Dashboard Header`.
Drag the symbol into each dashboard and only change the name, role badge and nav links.

---

## 3. Balsamiq controls to use

| What you see in the reference SVG | Balsamiq control |
|---|---|
| Page frame with address bar | **Browser Window** |
| Large heading | **Title** |
| Small heading / section label | **Subtitle** or **Label** |
| Grey bars (placeholder text) | **Paragraph** or **Lines of Text** |
| Dark filled button | **Button** (set it to "selected"/filled state) |
| Outlined button | **Button** (normal state) |
| Box with an X | **Image** |
| Small grey circle labelled "icon" | **Icon** (pick a simple icon, e.g. user, dumbbell, calendar) |
| Card / section background | **Rectangle** (Canvas / Panel) |
| Navigation links in a row | **Link Bar** (or separate **Link** controls) |
| Input field | **Text Input** with a **Label** above it |
| Role dropdown | **Combo Box** |
| Users table | **Data Grid** |
| Dashed message box (error/success) | **Alert Box**, or a dashed **Rectangle** with a **Label** |
| Role badge (ADMIN / TRAINER / MEMBER) | small rounded **Button** or **Label** in a Rectangle |
| Hamburger menu (☰) | **Icon** (bars / menu) |
| Dimmed background behind mobile menu | **Modal Screen** |
| Numbered black circles | **Callout** control (numbered) |
| Horizontal divider | **Horizontal Rule** |

---

## 4. Screen-by-screen instructions

Text in *[square brackets]* is a **placeholder** — do not replace it with invented details.
Real gym contact details will be added only when they are provided.

### 01 · Homepage — Desktop (`01-homepage-desktop.svg`)

Build the sections top to bottom inside one tall Browser Window (1280 wide).

| # | Section | What to place |
|---|---|---|
| ① | **Navbar** | Logo (small Rectangle with ∞ + text "INFINITY FITNESS") on the left. Link Bar: *About · Features · Contact* on the right, then a filled **Login** button. |
| ② | **Hero** | Grey background Rectangle. Label "WELCOME TO INFINITY FITNESS", Title "Train Without Limits. Manage Fitness Smarter.", 3 lines of Paragraph text, buttons **Member Login** (filled) and **Contact Us** (outlined). Image placeholder on the right labelled "Hero visual (gradient + icon)". |
| ③ | **About** | Title "About Infinity Fitness", 2 lines of text, then 3 equal cards (Rectangles) — **Admin**, **Trainer**, **Member** — each with an Icon, the role name and one short sentence explaining what that role does. |
| ④ | **Features Overview** | Grey background. Title "Features Overview". 8 cards in a 4 × 2 grid: *Membership Plans, Payment Records, Trainer Assignment, Attendance Tracking, Workout Plans, Progress Tracking, Notifications, Secure Role-Based Login*. Each card: Icon + feature name + 2 lines of text. |
| ⑤ | **Contact** | Title "Contact Us", subtitle "Visit the gym reception to become a member." 4 cards: *Address [Gym Address]*, *Phone [Phone Number]*, *Email [Email Address]*, *Opening Hours [Opening Hours]*. Below: the sentence "Accounts are created by the gym Admin — there is no online sign-up." and a **Member Login** button. |
| ⑥ | **Footer** | Dark Rectangle. Logo, one-line description, "Quick Links" (About, Features, Contact, Login), Horizontal Rule, copyright line. |

**Links (for clickable prototype):** Navbar *Login*, hero *Member Login* and contact *Member Login* → link to `03 Login`.

### 02 · Homepage — Mobile (`02-homepage-mobile.svg`)

Two frames side by side:

- **A. Full page** — the same sections as desktop, stacked in one column (375 wide).
- **B. Menu opened** — what happens when the hamburger icon is tapped.

| # | What to place |
|---|---|
| ① | Mobile navbar: logo on the left, **hamburger icon (☰)** on the right. The text links are hidden on mobile. |
| ② | Hero: heading wraps onto 3 lines, buttons become **full width** and stack, hero image moves **below** the text. |
| ③ | About: the 3 role cards are stacked vertically. |
| ④ | Features: the 8 cards form a **2-column** grid. |
| ⑤ | Contact: the 4 contact cards are stacked, full-width **Member Login** button below. |
| ⑥ | Footer: same content, stacked. |
| ⑦ | Frame B: a **Modal Screen** dims the page; a white panel slides in from the right with *Menu*, a close **✕**, links *About · Features · Contact*, and a full-width **Login** button. |

### 03 · Login (`03-login.svg`)

Simple top bar (logo + "← Back to Home" link) and one centred card (≈ 400 wide).

| # | What to place |
|---|---|
| ① | Error message area (Alert Box or dashed Rectangle): **"Invalid email or password."** Add a small note that it appears **only after a failed login**. The message is the same whether the email or the password was wrong (this avoids revealing which emails exist). |
| ② | **Email** Text Input and **Password** Text Input (password shows dots). |
| ③ | Full-width **Login** button. After a successful login the user is sent to the dashboard for their role. |
| ④ | Note under a Horizontal Rule: "No account? Please contact the gym reception." — **no Sign Up link**. |
| ⑤ | "← Back to Home" link (links to `01 Homepage Desktop`). |

Card header: logo icon, Title "Sign in to Infinity Fitness", text "Use the account provided by your gym Admin."

### 04 · Admin Dashboard (`04-admin-dashboard.svg`)

| # | What to place |
|---|---|
| ① | **Dashboard Header** (Symbol): logo · nav links *Dashboard* (active, underlined) and *User Accounts* · *[Admin Name]* · **ADMIN** badge · **Logout** button (outlined). |
| ② | Welcome card: Icon, "Welcome, [Admin Name]", "You are signed in as Admin." |
| ③ | "Your Account" card: Name, Email, Role — these values come from the logged-in **session**. |
| ④ | "User Accounts" card: short text + **Manage User Accounts** button (links to `05 Admin User Accounts`). |

Page title above the cards: **Admin Dashboard**, subtitle "Signed in successfully."

### 05 · Admin — User Accounts (`05-admin-user-accounts.svg`)

Page title **User Accounts**, subtitle "Create Trainer and Member accounts. There is no public registration."
Two columns: form card on the left (≈ 420 wide), table card on the right.

| # | What to place |
|---|---|
| ① | "Create New Account" form: Text Inputs **Full Name**, **Email**, **Temporary Password** (hint: "Minimum 8 characters"). |
| ② | **Role** Combo Box showing **"Select a role"** with only two options: *Trainer*, *Member*. There is **no default role** — the Admin must choose one. Admin accounts cannot be created from this form. |
| ③ | Message area (dashed): success "Account created successfully." or an error such as "Email already in use." Then a full-width **Create Account** button. |
| ④ | "Existing Accounts" **Data Grid** with columns *Name · Email · Role · Status · Created*. Fill rows with placeholders like *[Trainer Name]*, *[email]*, *[date]*. |
| ⑤ | Dashboard Header with *User Accounts* as the active link. |

### 06 · Trainer Dashboard (`06-trainer-dashboard.svg`)

Same layout as screen 04, but:

| # | What to place |
|---|---|
| ① | Dashboard Header with only the *Dashboard* link, *[Trainer Name]*, **TRAINER** badge, **Logout**. |
| ② | Welcome card: "Welcome, [Trainer Name]" / "You are signed in as Trainer." |
| ③ | "Your Account" card: Name, Email, Role = TRAINER. |

### 07 · Member Dashboard (`07-member-dashboard.svg`)

Same as screen 06, with *[Member Name]*, the **MEMBER** badge and Role = MEMBER.

---

## 5. Making it clickable and exporting

1. **Links:** select a button → in the Properties panel choose **Link** → pick the target wireframe.
   Suggested links:
   - Homepage *Login* / *Member Login* → `03 Login`
   - Login *Back to Home* → `01 Homepage Desktop`
   - Login *Login* button → `04 Admin Dashboard` (to demonstrate one successful login)
   - Admin *Manage User Accounts* / *User Accounts* link → `05 Admin User Accounts`
   - *Logout* buttons → `01 Homepage Desktop`
2. **Present:** use Balsamiq's **Presentation / Full Screen** mode to click through the flow.
3. **Export:** Project → **Export** → **PDF** (keeps links, good for submission) and/or **PNG** per
   wireframe for your report. Save the exports into this folder (`docs/wireframes/`) if you want them
   kept with the project, for example `docs/wireframes/balsamiq-export/`.

---

## 6. Viva notes (short explanations)

- **What is a wireframe?** A low-detail layout sketch that shows *where* content and controls go,
  before any colour or styling. It lets us agree on structure before writing code.
- **Why grayscale?** So the review focuses on layout and user flow, not on colours or images.
- **Why these 7 screens?** They are exactly the Week 3 scope: the public homepage, the login page,
  and one protected page per role to prove role-based access, plus the Admin page for creating accounts.
- **Why no Sign Up page?** The proposal requires that **only the Admin creates Trainer and Member
  accounts**. Removing public registration stops strangers from creating accounts.
- **Why does the Role dropdown have no default?** It forces the Admin to choose the role on purpose,
  so nobody is given the wrong permissions by accident.
- **Why one login page for all roles?** Everyone logs in the same way (email + password). The system
  reads the user's role from the database and sends them to the correct dashboard.
- **Why the same error for wrong email and wrong password?** A different message would tell an
  attacker which email addresses are registered.
- **Responsive design (screen 02):** on small screens the navigation collapses into a hamburger menu,
  multi-column grids become 1–2 columns, and buttons become full width for easier tapping.
- **User flow:** Homepage → Login → (role check) → Admin / Trainer / Member dashboard → Logout → Homepage.
