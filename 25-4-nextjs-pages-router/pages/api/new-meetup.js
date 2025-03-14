import { MongoClient } from 'mongodb';

// This NextJS feature is called API route.
// API routes are a special routes, special pages, which don't return HTML code, but which are instead
// about accepting incoming HTTP requests, also post patch, put delete requests,
// For example, receive JSON data, store data in a database and then return JSON data.
// So you could say API routes allow you to build your own API end points as part of this next project.
// And they will then be served by the same server as your next app.
// NOTE: this is a not a landing page for API requests. The request for a page will still land on index.js and there
// it will do a fetch which calls this handler to do the DB transacation and send a response back to index.js.
// See new-meetup/index.js 

// NOTE: api folder in pages is a special recognized folder in NextJS.
// The file needs to be named after the page which we want to recieve the API request for.

// URL: of this file:
// /api/new-meetup

async function handler(req, res) {
        if (req.method === 'POST') {
                const data = req.body;

                const client = await MongoClient.connect(
                        'mongodb+srv://shafin071:unferth1@cluster0.vyigy.mongodb.net/?retryWrites=true&w=majority&appName=meetups'
                );
                const db = client.db();

                const meetupsCollection = db.collection('meetups');

                const result = await meetupsCollection.insertOne(data);

                console.log(result);

                client.close();

                res.status(201).json({ message: 'Meetup inserted!' });
        }
}

export default handler;