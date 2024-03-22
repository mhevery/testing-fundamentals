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

## Create a GitHub Personal Access Token

One of the examples uses the GitHub API to access public repo names for a user. You'll need to create a Personal Access Token and add it to the `.env` file:

1. Go to your [Settings -> Developer Settings -> Personal Access Tokens](https://github.com/settings/tokens)
2. Use the menu to generate a "New Personal Access Token (classic)"
3. Choose an expiration and give it Repo -> public_repo scope
4. Click Generate Token at the bottom
5. When the token is generated, copy/paste it into your `.env` file
6. Restart your development server

You should now be able to see repo information in the GitHub app: http://localhost:5173/github/mhevery/qwik/


