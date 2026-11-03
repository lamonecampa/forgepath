# ForgePath

**A beginner-first learning portal for C, C++, C#, HTML, JavaScript, Python, PHP, Git/GitHub, MySQL, and Laravel.**

ForgePath is a standalone static website designed to guide new learners from web fundamentals to a working CRUD application.

## Live site

After enabling GitHub Pages:

- https://lamonecampa.github.io/forgepath/

## Learning structure

1. **Start Here** — web architecture, HTML, CSS, and programming logic.
2. **HTML Course** — 16 modules covering document structure, forms, semantics, multimedia, and a website project.
3. **Python Course** — 14 modules covering setup, syntax, data types, control flow, collections, functions, lambda, and arguments.\n4. **Python Playground** — runs Python 3 in the browser with Pyodide/WebAssembly; no local interpreter required.
5. **C Course** — 20 modules from compiler setup and fundamentals to arrays, functions, structs, pointers, dynamic memory, files, macros, and headers.
6. **C# Course** — 9 modules covering .NET setup on Windows/Linux, VS Code, syntax, console I/O, variables, data types, and operators.
7. **C++ Course** — 15 modules from setup and syntax to arrays, functions, enums, structs, unions, and pointers.
8. **JavaScript Course** — 15 modules from language basics to arrays, objects, DOM, Math, Fetch/AJAX, and events.
9. **PHP Course** — 15 modules from syntax and data types to validation, database access, debugging, and OOP. Petani Kode references are included as further reading.
10. **Git & GitHub Course** — 13 modules covering installation, commits, history, diffs, revert/reset, branches, remotes, pull requests, VS Code, and tags.
11. **MySQL Course** — 10 modules from relational modeling to joins, transactions, indexing, and security.
12. **Laravel Course** — 9 modules from project setup to CRUD, authentication, testing, and deployment.
13. **PHP Playground** — runs PHP 8.4 in the browser using the PHP.wasm runtime. Runtime assets are built by GitHub Actions.
14. **PHP Lab** — lightweight structural checks and additional PHP exercises.
15. **SQL Lab** — in-browser query practice powered by sql.js (SQLite/WebAssembly), not a MySQL server.
16. **Knowledge Check** — 12 auto-graded questions with explanations.
17. **Project Path** — four incremental projects, completion checklist, and evaluation rubric.

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
├── html-course.html
├── python-course.html\n├── python-playground.html\n├── assets/python-playground.js\n├── assets/python-worker.js
├── c-course.html
├── csharp-course.html
├── cpp-course.html
├── javascript-course.html
├── git-course.html
├── php-course.html
├── mysql-course.html
├── laravel-course.html
├── php-playground.html
├── php-lab.html
├── src/
│   └── php-playground.js
├── package.json
├── vite.php.config.js
├── .github/workflows/build-php-runtime.yml
├── sql-lab.html
├── quiz.html
├── projects.html
├── assets/
│   ├── style.css
│   ├── app.js
│   └── php-runtime/ (generated PHP.wasm assets)
└── README.md
```

## License

Educational use. Add a license if you intend to distribute or relicense the project.

## PHP WebAssembly build

The `Build PHP WebAssembly runtime` workflow runs on pushes to `main`, installs pinned dependencies, bundles the official WordPress Playground PHP.wasm runtime for PHP 8.4, and commits generated files to `assets/php-runtime/`. The workflow ignores commits containing only generated runtime files to avoid a build loop.
