# ForgePath

**A beginner-first learning portal for C, C++, C#, HTML, JavaScript, Python, PHP, Git/GitHub, MySQL, and Laravel.**

ForgePath is a static learning portal with structured courses, browser-based programming labs, quizzes, and project exercises.

## Site

- GitHub repository: https://github.com/lamonecampa/forgepath
- GitHub Pages: https://lamonecampa.github.io/forgepath/ (available after Pages is enabled and deployment succeeds)

## Learning tracks

| Track | Modules | Focus |
|---|---:|---|
| HTML | 16 | Document structure, forms, semantics, multimedia, website project |
| Python | 14 | Setup, syntax, types, control flow, collections, functions |
| C | 20 | Procedural programming, pointers, memory, files, macros |
| C# | 9 | .NET setup, syntax, console I/O, variables, types, operators |
| C++ | 15 | Modern C++, control flow, functions, arrays, structs, pointers |
| JavaScript | 15 | Language basics, arrays, objects, DOM, Fetch, events |
| PHP | 15 | Syntax, data types, validation, database access, debugging, OOP |
| Git & GitHub | 13 | Commits, history, diffs, reset/revert, branches, remotes, PRs |
| MySQL | 10 | Relational modeling, queries, joins, transactions, indexing, security |
| Laravel | 9 | Project setup, routing, MVC, CRUD, authentication, testing, deployment |

**Total: 10 learning tracks and 136 course modules.**

## Browser labs

- **Web Playground** — HTML, CSS, and JavaScript live preview in a sandboxed iframe.
- **Python Playground** — CPython in the browser through Pyodide/WebAssembly.
- **C/C++ Playground** — Clang compiles C and C++ to WASI/WebAssembly; the resulting program runs in a browser worker.
- **C# Playground** — Roslyn and .NET WebAssembly through WasmSharp.
- **PHP Playground** — PHP 8.4 through the WordPress Playground PHP.wasm runtime.
- **SQL Lab** — SQLite query practice through sql.js. It is not a MySQL server.
- **PHP Lab** — editing and heuristic exercises only; it does not execute PHP.
- **Knowledge Check** — 12 auto-graded questions with explanations.
- **Project Path** — four incremental projects with completion checklist and evaluation rubric.

## Technology

- HTML, CSS, vanilla JavaScript
- Pyodide 0.29.3
- `@live-codes/clang-wasm` 0.3.0
- WasmSharp 0.10.2 and `@wasmsharp/vite-plugin` 0.10.0
- WordPress Playground PHP.wasm 3.1.60
- sql.js 1.10.3
- Browser localStorage for learning progress

## Build and deploy

The repository uses GitHub Actions to build and commit the PHP, C/C++, and C# WebAssembly assets. The first download of a compiler/runtime can be large. C/C++ Clang assets are approximately 29 MB compressed; the browser may need substantially more memory while the compiler is active. Python and PHP runtimes are also loaded on demand.

Workflow: `.github/workflows/build-php-runtime.yml`

To run the build locally, use Node.js 22 or newer:

```bash
npm install
npm run build:php
npm run build:clang
npm run build:csharp
python -m http.server 8000
```

Then open `http://localhost:8000`. Browser workers and WebAssembly should be tested over HTTPS or localhost, not by opening HTML files with `file://`.

Enable GitHub Pages:

1. Open repository **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select branch `main` and folder `/(root)`.
4. Save and wait for the Pages deployment to finish.

## Technical boundaries

### C and C++

The playground compiles to WASI/WebAssembly, not a native Windows or Linux executable. System calls, networking, threads, filesystem access, and some libraries differ from desktop toolchains. The first toolchain download is substantial. A successful WASI run does not guarantee identical behavior on another operating system.

### C#

WasmSharp runs Roslyn and .NET WebAssembly in the browser. It is not a full replacement for Visual Studio or a desktop .NET SDK. Browser runtime support, assemblies, OS APIs, threading, and filesystem behavior have limitations. See the upstream WasmSharp documentation for the tested feature surface.

### Python

Pyodide runs CPython through WebAssembly. Many standard and scientific packages work, but packages requiring native extensions must be built for Pyodide. Desktop OS access and arbitrary networking are not equivalent.

### PHP

The PHP Playground executes PHP 8.4 in WebAssembly. It is not a persistent PHP server and does not provide a real MySQL service or a full Laravel server environment. The separate PHP Lab is a heuristic editor, not a PHP interpreter.

### SQL

SQL Lab uses SQLite through sql.js, not MySQL. Core SQL practice is useful, but dialect-specific syntax, data types, functions, constraints, and DDL may differ. Test final applications against the target MySQL version.

### Laravel

Always check the official Laravel documentation for the version used by the project: https://laravel.com/docs. Older tutorials are not automatically compatible with current releases. Verify PHP and Composer requirements before installation.

## Progress and privacy

Learning and project checklists use browser localStorage. Progress stays in the current browser profile and is not synchronized to a server or other devices. Clearing browser storage removes it. Browser compiler labs execute locally; runtime assets are downloaded from the configured static hosting origin or CDN.

## Repository structure

```
.
├── index.html
├── start.html
├── html-course.html
├── python-course.html
├── python-playground.html
├── c-course.html
├── csharp-course.html
├── cpp-course.html
├── javascript-course.html
├── git-course.html
├── php-course.html
├── mysql-course.html
├── laravel-course.html
├── c-cpp-playground.html
├── csharp-playground.html
├── php-playground.html
├── playground.html
├── php-lab.html
├── sql-lab.html
├── quiz.html
├── projects.html
├── src/
│   ├── clang-worker.js
│   └── csharp-playground.js
├── assets/
│   ├── style.css
│   ├── app.js
│   ├── python-playground.js
│   ├── python-worker.js
│   ├── c-cpp-playground.js
│   └── generated runtime assets/
├── package.json
├── vite.php.config.js
├── vite.clang.config.js
├── vite.csharp.config.js
└── .github/workflows/build-php-runtime.yml
```

## License

Educational use. Add a license if you intend to distribute or relicense the project.
