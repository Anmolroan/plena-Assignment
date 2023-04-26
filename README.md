# To start the application below are the steps

### run the command 'npm i' to download all the packages


### configure the databse url in env and secret key 

### run the command 'npx prisma migrate dev --name init' to create the tables

### run 'npm run start:dev' to start he application

### to see the contract 'http://localhost:3000/api#/' 



Make a service which creates different posts and comments for the post. only required technology is express.js you can choose everything else.
post consists of an image (jpg, png, jpeg types only), title, description and tags. tags are case insensitive and we need to have a tag counter. so for example we should be able to see how many posts are there with specific tags. Comment consists only of text but is associated to specific post. In posts we have a comment counter. Whenever a comment a new comment is created or a comment is removed we release an event through any event streaming technology (you can choose one you are comfortable with) and we increment or decrement the comment counter.

post requirements:
all fields are required except tags. 
the title should be unique, min length 3 max 20
description min length 10 max 3000

comment requirements:
comment length should be in between 2-200 characters.

features:
fetch posts. // order create date desc
fetch specific post by title
search posts by title (case insensitive search), tags, user and in between specific dates (not all fields are required but we should be able to filter with all of them if user provides)
create post
update post
delete post by ids

fetch comments for post
delete comment

few considerations:
when we are creating a post/comment we should have a jwt token in header. from jwt token we should read user's username
when deleting or updating posts we should check if it's a valid user to delete or update a post

when fetching the post/comment we should also get the username who created a post and create date