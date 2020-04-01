# Blogger ✍
---

## Project Description 📜
**Blogger** is a simple blogging application. The user creates an account, and once logged in is able to create posts which are then viewable by other users. Posts can then be commented on and liked.

**Live Version** http://blogger-blogger.herokuapp.com/
*- Jon*

![desktop view](https://github.com/Jmacr0/react-social/raw/master/blogger.PNG "Logo Title Text 1")
---

## User Story 👤

```
AS a Person with many interests and ideas

I want a Personal Blog

SO that I can share my interests and ideas with others
```

## Acceptance Criteria ✅

```
GIVEN the User has many interests and ideas

WHEN they click `NEW POST`

THEN a page provides input that lets the user create a new post
```

## Instructions 👩‍🏫

How to get started with **Blogger**:

---
1. Create a New User. Then proceed to Login.
---
2. Once logged in, user can view their profile page. From here, they can view their bio, total posts, and a list of their posts. They can also edit their profile from here.
---
3. Clicking on the *BBlogger* navbrand will redirect the user to the homepage. From here they are greeted with a welcome, along with all the posts created by users in reverse chronological order. User can proceed to view, comment, and like posts.
---
4. In the navbar, the user can click on *New Post* button to create a new Post. 
---
5. Once finished using the app, the user can click the *Logout* button to remove their session.
---

## Features 🌠

---
#### Authentication 🔐

**BBlogger** implements user authentication through Passport.js. This library provides a method to validate user login and prevent unauthorized users from accessing certain routes.

#### Post Creation

The primary feature of the application is the ability for an authenticated user to create a post associated to their id. This is achieve through mySQL tabular database and joining. In a similar fashion, comments can be created in association to a post, and is stored to the databse.

