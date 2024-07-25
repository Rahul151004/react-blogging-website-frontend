# React + Vite Example App

## Getting started

To get the frontend running locally:

- Clone this repo
- `npm install` to install all req'd dependencies
- `npm run dev` to start the local server (this project Vite)
- process.env.REACT_APP_BASE_URL has to be changed to `http://localhost:{PORT}`


## Functionality overview

The example application is a social blogging site (i.e. a Medium.com clone) called "PostPoint". It uses a custom API for all requests, including authentication.

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU* users (sign up & settings page - no deleting required)
- CRUD Articles (Delete fucntionality - work in progress)
- CR*D Comments on articles (no updating required)
- GET and display lists of articles
- Favorite articles (work in progress)
- Follow other users (work in progress)

**The general page breakdown looks like this:**

- Home page (URL: /#/ )
    - List of tags
    - List of articles pulled from either Feed, Global, or by Tag
- Sign in/Sign up pages (URL: /#/login, /#/register )
    - Use JWT (store the token in localStorage)
- Settings page (URL: /#/settings )
- Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )
- Article page (URL: /#/article/article-slug-here )
    - Delete article button (only shown to article's author) (work in progress)
    - Render markdown from server client side
    - Comments section at bottom of page
    - Delete comment button (only shown to comment's author)
