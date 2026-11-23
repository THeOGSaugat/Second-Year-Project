# Infinity Fitness — ERD Explanation

This folder contains the **Entity Relationship Diagram (ERD)** for the complete Infinity Fitness system.

| File | What it is |
|---|---|
| `infinity-fitness-erd.drawio` | **Editable** diagram — open and edit it in draw.io (diagrams.net) |
| `infinity-fitness-erd.png` | High-resolution image (3324 × 2656) for the report / slides |
| `infinity-fitness-erd.svg` | Scalable image (stays sharp when zoomed) |
| `ERD_EXPLANATION.md` | This file — explanation of every entity and relationship |

The ERD shows the **whole system design** in plain black and white. In Week 3 only the **User** table is
built in the database, because Week 3 covers authentication. All other tables are designed now and will be
implemented in later weeks.

---

## 1. How to open and edit the diagram

Any of these work:

- **Browser:** go to <https://app.diagrams.net> → *Open Existing Diagram* → choose `infinity-fitness-erd.drawio`.
- **draw.io Desktop app** (free): File → Open.
- **VS Code:** install the *Draw.io Integration* extension, then click the `.drawio` file.

Every table is a native draw.io **Entity Relation list** shape: the attributes are stacked top to bottom,
you can click a row to change its text, add or delete rows, drag tables around, and the relationship
lines stay connected.

### About the PNG/SVG exports

The SVG was exported with **draw.io's own rendering engine** (the same code the draw.io app uses), after
applying the same automatic table layout the draw.io editor applies. The PNG is a 2× rendering of that SVG.
So both images match the `.drawio` file exactly.

If you edit the `.drawio` file, re-export the images from draw.io so they stay in sync:
**File → Export as → PNG** (leave *Transparent Background* unticked, set zoom to 200%) and **File → Export as → SVG**.
Save them over the existing files in this folder.

---

## 2. How to read the diagram

| Symbol | Meaning |
|---|---|
| **PK** | Primary Key — uniquely identifies each row |
| **FK** | Foreign Key — stores the PK of another table to link the two |
| **UK** | Unique — no two rows can have the same value (e.g. email) |
| **FK, UK** | A foreign key that is also unique → this creates a **one-to-one** link |
| Underlined attribute | The primary key of that table |
| `──┼┼` | **Exactly one** |
| `──○┼` | **Zero or one** |
| `──○<` | **Zero or many** |
| `──┼<` | **One or many** |

Read each line **starting from the "exactly one" (┼┼) end**. Example:
*"One MembershipPlan is chosen in zero or many Memberships."*

All `id` columns are text IDs (`String`), generated automatically by Prisma (`cuid()`).
They are hard to guess, unlike 1, 2, 3, … numbers.

---

## 3. Entities (14)

### Group A — Users and roles

**1. User** *(built in Week 3)* — every person who can log in: Admin, Trainer or Member.

| Attribute | Type | Notes |
|---|---|---|
| **id** (PK) | String | |
| name | String | |
| email (UK) | String | used to log in; must be unique |
| passwordHash | String | the **hashed** password — the real password is never stored |
| role | Role (enum) | `ADMIN`, `TRAINER` or `MEMBER` |
| status | UserStatus (enum) | `ACTIVE` or `INACTIVE` (inactive users cannot log in) |
| createdAt, updatedAt | DateTime | set automatically |

**2. TrainerProfile** — extra details that only trainers have.
Attributes: id (PK), userId (FK, UK), phone, specialization\*, experienceYears\*.

**3. MemberProfile** — extra details that only members have.
Attributes: id (PK), userId (FK, UK), phone, gender\*, dateOfBirth\*, address\*, joinDate.

### Group B — Memberships and payments

**4. MembershipPlan** — the packages the gym offers (e.g. "Monthly", "3 Months").
Attributes: id (PK), name, durationMonths, price, description\*, isActive\*.

**5. Membership** — one member's purchase of a plan for a period of time.
Attributes: id (PK), memberId (FK), planId (FK), startDate, endDate, status (e.g. active / expired).

**6. Payment** — money paid for a membership.
Attributes: id (PK), membershipId (FK), amount, paymentDate, method\*, status\*.

### Group C — Training

**7. TrainerAssignment** — records which trainer is assigned to which member.
Attributes: id (PK), trainerId (FK), memberId (FK), assignedDate, isActive\*.

**8. WorkoutPlan** — a workout programme a trainer creates for a member.
Attributes: id (PK), trainerId (FK), memberId (FK), title, goal\*, startDate, endDate\*.

**9. WorkoutDay** — one day inside a workout plan (Day 1, Day 2, …).
Attributes: id (PK), workoutPlanId (FK), dayNumber, focus\* (e.g. "Chest & Triceps").

**10. Exercise** — one exercise on a workout day.
Attributes: id (PK), workoutDayId (FK), name, sets, reps, notes\*.

### Group D — Tracking

**11. Attendance** — one row each time a member visits the gym.
Attributes: id (PK), memberId (FK), checkInTime, checkOutTime\*.

**12. ProgressRecord** — a member's body measurements on a given date.
Attributes: id (PK), memberId (FK), recordDate, weightKg, heightCm\*, notes\*.

### Group E — System

**13. Notification** — a message shown to a user (e.g. "Your membership expires soon").
Attributes: id (PK), userId (FK), title, message, isRead, createdAt.

**14. AuditLog** — a record of important actions, for accountability (e.g. "Admin created account X").
Attributes: id (PK), userId (FK), action, details\*, createdAt.

---

## 4. Relationships in simple language

| # | Relationship | Type | In simple words | Where the FK is |
|---|---|---|---|---|
| 1 | User — TrainerProfile | **1 : 0..1** (one-to-one) | A user *may* have one trainer profile (only if their role is Trainer). Each trainer profile belongs to exactly one user. | `TrainerProfile.userId` (unique) |
| 2 | User — MemberProfile | **1 : 0..1** (one-to-one) | A user *may* have one member profile (only if their role is Member). Each member profile belongs to exactly one user. | `MemberProfile.userId` (unique) |
| 3 | User — Notification | **1 : 0..\*** | A user can receive many notifications; each notification is for one user. | `Notification.userId` |
| 4 | User — AuditLog | **1 : 0..\*** | A user can perform many logged actions; each log entry was done by one user. | `AuditLog.userId` |
| 5 | MembershipPlan — Membership | **1 : 0..\*** | One plan can be chosen by many memberships; each membership is for one plan. | `Membership.planId` |
| 6 | MemberProfile — Membership | **1 : 0..\*** | A member can have many memberships over time (renewals); each membership belongs to one member. | `Membership.memberId` |
| 7 | Membership — Payment | **1 : 0..\*** | A membership can be paid with one or more payments (or none yet, if unpaid); each payment is for one membership. | `Payment.membershipId` |
| 8 | TrainerProfile — TrainerAssignment | **1 : 0..\*** | A trainer can appear in many assignments. | `TrainerAssignment.trainerId` |
| 9 | MemberProfile — TrainerAssignment | **1 : 0..\*** | A member can appear in many assignments. | `TrainerAssignment.memberId` |
| 10 | TrainerProfile — WorkoutPlan | **1 : 0..\*** | A trainer creates many workout plans; each plan is created by one trainer. | `WorkoutPlan.trainerId` |
| 11 | MemberProfile — WorkoutPlan | **1 : 0..\*** | A member can follow many workout plans over time; each plan is for one member. | `WorkoutPlan.memberId` |
| 12 | WorkoutPlan — WorkoutDay | **1 : 1..\*** | A plan contains **at least one** day; each day belongs to one plan. | `WorkoutDay.workoutPlanId` |
| 13 | WorkoutDay — Exercise | **1 : 1..\*** | A day includes **at least one** exercise; each exercise entry belongs to one day. | `Exercise.workoutDayId` |
| 14 | MemberProfile — Attendance | **1 : 0..\*** | A member checks in many times; each attendance row is for one member. | `Attendance.memberId` |
| 15 | MemberProfile — ProgressRecord | **1 : 0..\*** | A member has many progress records over time; each record is for one member. | `ProgressRecord.memberId` |

### The many-to-many relationship: Trainer ↔ Member

- A trainer can train **many** members, and a member can be trained by **many** trainers
  (for example, when a member changes trainer). This is a **many-to-many (M:N)** relationship.
- A relational database cannot store M:N directly, so we add a **junction table**:
  **TrainerAssignment**. It holds one row per *trainer–member pair* (`trainerId` + `memberId`).
- This splits the M:N into **two one-to-many** relationships (rows 8 and 9 above).
- The extra columns (`assignedDate`, `isActive`) describe the assignment itself — which is why a
  separate table is the right place for them.

### The one-to-one relationships: User ↔ Profiles

- Login details (email, password, role) are the same for everyone, so they live in **User**.
- Details that only trainers or only members have live in **TrainerProfile** / **MemberProfile**.
- `userId` in each profile is both a **foreign key** and **unique**, so one user can have at most one profile
  of each kind — that is what makes the link one-to-one.
- The Admin has no profile table, because the proposal does not need any Admin-only details.

---

## 5. What is implemented in Week 3

Only the authentication part of the database is created now:

```
enum Role       { ADMIN, TRAINER, MEMBER }
enum UserStatus { ACTIVE, INACTIVE }

User (id, name, email, passwordHash, role, status, createdAt, updatedAt)
```

- `role` has **no default value** — the Admin must choose Trainer or Member when creating an account.
- Auth.js uses **JWT sessions** (stored in a secure, encrypted cookie), so no `Session` or `Account`
  tables are needed. Those tables are only required for database sessions or social logins (Google, etc.),
  which this project does not use.
- The other 13 tables will be added in later weeks, following this ERD.

---

## 6. Design assumptions to confirm

The **14 entities** and their **relationships** are the agreed design.
The attributes marked with `*` in section 3 of this document are my **suggestions**, added so that each
table is useful in practice (the diagram itself shows no markers). Please compare them with your accepted
proposal and remove or rename any that do not match:

| Entity | Assumed attributes (\*) |
|---|---|
| TrainerProfile | specialization, experienceYears |
| MemberProfile | gender, dateOfBirth, address |
| MembershipPlan | description, isActive |
| Payment | method, status |
| TrainerAssignment | isActive |
| WorkoutPlan | goal, endDate |
| WorkoutDay | focus |
| Exercise | notes |
| Attendance | checkOutTime |
| ProgressRecord | heightCm, notes |
| AuditLog | details |

To remove one: open the `.drawio` file, click the row, press **Delete**, then re-export the PNG/SVG.

---

## 7. Viva notes (likely questions)

- **What is an ERD?** A diagram of the database: the *entities* (tables), their *attributes* (columns),
  their *keys*, and the *relationships* between them with *cardinality* (how many of one relate to how many of the other).
- **Why one User table instead of separate Admin/Trainer/Member tables?** Everyone logs in the same way,
  so one table keeps authentication simple. The `role` column decides what each user can access.
- **What is a foreign key?** A column that stores the primary key of another table, e.g.
  `Membership.memberId` points to the member who owns that membership.
- **Why is Membership separate from MembershipPlan?** The plan is the *product* (name, price, duration).
  A membership is *one member buying that product* on certain dates. Keeping them separate means a price
  change does not rewrite old memberships, and a member's renewal history is kept.
- **Why can a membership have many payments?** It allows instalments or partial payments, and keeps a
  history of each payment.
- **Why is TrainerAssignment needed?** Because Trainer ↔ Member is many-to-many; a junction table is the
  standard way to represent that.
- **Why split WorkoutPlan → WorkoutDay → Exercise?** It mirrors a real programme (plan → days → exercises)
  and avoids repeating plan details on every exercise row (normalisation).
- **Why store `passwordHash` and not the password?** If the database leaked, hashed passwords cannot be
  turned back into the real passwords.
- **Why are only some tables built in Week 3?** The Week 3 deliverable is authentication; the other modules are
  scheduled for later weeks. Designing the full ERD now makes sure the User table will fit the future tables.
