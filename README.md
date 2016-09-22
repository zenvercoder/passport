## CRUD

### Steps

* `npm init -y` (creates basic package.json)

* `npm i -S bcrypt body-parser cookie-parser express express-session hbs morgan passport passport-local` (node_modules appears. dependencies now listed in package.json)

* 9-11-16 did not include debug or serve-favicon. Checking to see if this will work without those.

* `echo node_modules > .gitignore`

* add to github

* 9-12-16 going to try to require all of the libraries in my app.js... actually going to try to do the least amt of libraries needed to make just one view (register) work.

* 9-13-16 spent a lot of time going down rabbit holes yesterday, trying to understand every line of code. I will do more of that on round two. Must get the whole thing working first.

* 9-17-16 use mdlite for styling

* 9-18-16 [heroku link](https://code-stories.herokuapp.com/)

*

### Notes

The first working iteration was mostly derived from [this repo](https://github.com/dannyfritz/passport-example/tree/memory) by [Danny Fritz](https://github.com/dannyfritz)

I had to tweak it here and there because straight up copying it didn't work the first time. Had to trouble shoot to figure out why it wasn't working.

One huge piece of advice that I got that really helped was "If you're going to try to make someone else's code work, look at the package.json" This was the final piece that I was missing. I thought I had installed all of the necessary dependencies in the first place but something wasn't exactly right.

I'm about to work on iteration 2 now. Going to delete the entire thing and start again from scratch. Hopefully round two will be a little bit faster this time.

10-22-16 add .env research what .env even is. I know it's for... think it's something about routes? let's go read...
"a zero dependency module that loads environment variables into process.env, storing configuration in the environment separate from code"
So yeah... glad I read it. Had a vague idea now I'm getting it a lil more.
 `npm install dotenv --save` heyyy paste is now working. "As early as possible in your application, require and configure dotenv." oops. project is 85% complete lol.

[dotenv]() ...aaaand now paste isn't working for me. Silly how I depend on something so small and it basically ruins everything if it doesn't work lol. anywhoo. I'll fix that too.

Go to the knexfile.js file. set production.connection: process.env.DATABASE_URL,

`require('dotenv').config()` to the top of the knexfile.js file


`


### A brief look at package.json

body-parser = parses and exposes the body of request (req.body)
Cookie-parse = it’s middleware. Like body-parser it exposes and makes it convenient to read things from the header. It populates req.cookies with an object

express-session = Session, you get a unique id so others can’t use your data. It does into the cookie as your session id, every time you make a request, you send that session id from the cookie, so it knows “oh this is a request from this user, this session.” Basically, it’s a server-side map of properties. (ex. a server-side copy of your shopping cart would go in session)

hbs = renders .hbs files when res.render is called. (What I understand about this today: hbs is for view/layout/display)

morgan = request logger

passport = request authentication for node.js using “strategies”. Uses serialize and deserialize (ex. serializing the user ID, and finding the user by ID when deserializing.)

passport-local = authenticate w username/password






## Credits:

[Original repo](https://github.com/dannyfritz/passport-example/tree/memory) by [Danny Fritz](https://github.com/dannyfritz)
