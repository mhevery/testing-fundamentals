This repo is a companion to the [Web App Testing course](https://frontendmasters.com/courses/web-app-testing/) on Frontend Masters.

[![Frontend Masters](images/FrontendMastersLogo.png)](https://frontendmasters.com/courses/web-app-testing/)

## Overview

There are two applications in this codebase. The `main` branch shows the final solution with all tests added. The `no-tests` branch has a version of each application without and tests and is the started point for the course. Individual checkpoint branches have been added (e.g. `lesson-1`) and are refrenced throughout the course.

## Installation & Setup

To follow along with the course, clone the repository and checkout the `no-tests` branch. Then installed the dependencies with either Yarn or NPM and use `npm run dev` to start the server:

> [!NOTE]
> We recommend using Node version 20 for this course (version 20.11.1 was used during the recording)

```shell
git clone https://frontendmasters.com/courses/web-app-testing/
cd testing-fundamentals
git checkout no-tests
npm install # or yarn
npm run dev
```

## Applications

After running the development server, you'll find the two applications here:
- Repository Lookup: http://localhost:5137/github/
- Clustering: http://localhost:5137/clustering/

With the Repository Lookup application, you'll need to append a username and a repo in the URL to get data. For example: http://localhost:5137/github/mhevery/qwik/