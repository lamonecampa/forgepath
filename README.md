# ForgePath

**A beginner-first learning portal for PHP, MySQL, and Laravel.**

ForgePath is a standalone static website designed to guide new learners from web fundamentals to a working CRUD application.

## Live site

After enabling GitHub Pages:

- https://lamonecampa.github.io/forgepath/

## Learning structure

1. **Start Here** — web architecture, HTML, CSS, programming logic, PHP, MySQL, and Laravel foundations.
2. **PHP Lab** — code editor and lightweight structural checks. PHP execution requires a local PHP interpreter/server.
3. **SQL Lab** — in-browser query practice powered by sql.js (SQLite/WebAssembly) with a sample relational database.
4. **Knowledge Check** — 12 auto-graded questions with explanations.
5. **Project Path** — four incremental projects, completion checklist, and evaluation rubric.

## Technology

- HTML, CSS, vanilla JavaScript
- sql.js 1.10.3 from CDN for browser-based SQLite exercises
- Google Fonts (DM Sans, DM Mono, Manrope)
- Browser localStorage for progress

No build step or package manager is required.

## Run locally

Open `index.html` in a browser, or serve the folder with any static HTTP server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Enable GitHub Pages

1. Open repository **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select branch `main` and folder `/(root)`.
4. Save and wait for the deployment to finish.

## Important technical boundaries

### PHP Lab
The PHP editor does not execute PHP in the browser. It offers editing, copying, and basic heuristic checks only. Run actual code using PHP CLI, XAMPP, Laragon, or another PHP web server. For syntax validation, use:

```bash
php -l filename.php
```

### SQL Lab
SQL Lab uses SQLite through sql.js, not a MySQL server. Core SQL practice such as SELECT, WHERE, GROUP BY, and JOIN is useful, but dialect-specific syntax, data types, functions, constraints, and DDL may differ. Test final applications against the target MySQL version.

### Laravel versions
Always check the official Laravel documentation for the version used by the project: https://laravel.com/docs. Older Laravel tutorials are not automatically compatible with current releases. Verify PHP and Composer requirements before installation.

## Progress and privacy

Learning and project checklists use localStorage. Progress stays in the current browser profile and is not synchronized to a server or other devices. Clearing browser storage removes it.

## Structure

```
.
├── index.html
├── start.html
├── php-lab.html
├── sql-lab.html
├── quiz.html
├── projects.html
├── assets/
│   ├── style.css
│   └── app.js
└── README.md
```

## License

Educational use. Add a license if you intend to distribute or relicense the project.
