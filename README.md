# Pels Pie Co. Website

## Synopsis

This is a full stack website that I created for my girlfriend's pie shop as an exercise in full MVC deployment on a live site. I recreated the design from a previous site made in Muse, and helped streamline some of the UI. From there, I built out an event inquiry page, and a fully integrated e-commerce page utilizing Square's API. There's also a admin page where the owner can view all event inquiries.

This is all deployed using AWS Elastic Beanstalk.  An EC2 instance was created, and a database is stored using their RDS storage system.  Their is also a DNS redirect to get the right content when the URL is entered.


## Requirements


Several npm packages are needed for this app to work:

axios
body-parser
cookie-parser
dotenv
express
morgan
mustache-express
nodemailer
pg-promise
promise-mysql
util

To install these, first go to your source directory and use 'npm install' and then 'npm init' to initialize npm.  Then type 'npm install --save [package name]' for each of the ones listed above.


## Public Location

The app can be accessed at https://www.pelspieco.com