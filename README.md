# Vehicle Maintenance Tracker

A MEN stack app for vehicle service listings. Users can sign up, sign in, view service listings, and leave reviews. Vendor users can create new service listings.

## Tech Stack

- MongoDB
- Express
- Node.js
- EJS
- Mongoose
- Express Session
- bcrypt
- method-override
- Morgan

## RESTful Routes Used

| CRUD Action | RESTful Action | HTTP Method | Route | Purpose |
| ----------- | -------------- | ----------- | ----- | ------- |
| Read | `index` | `GET` | `/listings` | Show all listings |
| Read | `show` | `GET` | `/listings/:id` | Show one listing |
|  | `new` | `GET` | `/listings/new` | Show form to create a listing |
| Create | `create` | `POST` | `/listings` | Add a new listing |
| Edit | `edit` | `GET` | `/listings/:id/edit` | Show form to edit a listing |
| Update | `update` | `PUT` | `/listings/:id` | Save listing changes |
| Delete | `delete` | `DELETE` | `/listings/:id` | Remove a listing |
| Create | `createReview` | `POST` | `/listings/:id/reviews` | Add a review |
| Delete | `deleteReview` | `DELETE` | `/listings/:id/reviews/:reviewId` | Remove a review |

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```bash
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

Run the app:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

Use `Ctrl + c` to stop the server.

## Project Structure

```bash
config/
controllers/
middleware/
models/
public/
views/
server.js
```

## Main Files

- `server.js` connects the app, middleware, routes, sessions, and MongoDB.
- `controllers/auth.js` handles sign up, sign in, sign out, home, and dashboard.
- `controllers/listing.js` handles listings and reviews.
- `models/user.js` stores users with username, password, and role.
- `models/listings.js` stores service listings.
- `models/review.js` stores reviews.
- `views/partials/nav.ejs` is the reusable navbar.
- `public/css/style.css` holds the CSS.

## Auth Notes

This app uses sessions to remember signed-in users:

```js
req.session.user = {
    username: user.username,
    id: user.id,
    role: user.role,
};
```

Some routes are protected with middleware:

- `isSignedIn` only allows signed-in users.
- `isVendor` only allows vendor users to create new listings.

## EJS Notes

This project uses EJS to render pages from the `views` folder:

```js
res.render("listings/index.ejs", { allListings });
```

The navbar is reused with a partial:

```ejs
<%- include("../partials/nav.ejs") %>
```

Dynamic listing links use the listing id:

```ejs
<a href="/listings/<%= item._id %>">
    <%= item.service %>
</a>
```

## Static Files

CSS files are served from the `public` folder:

```js
app.use(express.static(path.join(__dirname, "public")));
```

The stylesheet is linked like this:

```ejs
<link rel="stylesheet" href="/css/style.css">
```

## Git Ignore

The project ignores dependencies and local environment variables:

```bash
node_modules
.env
```
