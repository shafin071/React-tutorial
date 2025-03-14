import { Fragment } from 'react';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';

// not needed anymore since we getting data from DB
// const DUMMY_MEETUPS = [
//         {
//                 id: 'm1',
//                 title: 'A First Meetup',
//                 image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//                 address: 'Some address 5, 12345 Some City',
//                 description: 'This is a first meetup!'
//         },
//         {
//                 id: 'm2',
//                 title: 'A Second Meetup',
//                 image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//                 address: 'Some address 10, 12345 Some City',
//                 description: 'This is a second meetup!'
//         }
// ];


// the props is the data returned by getStaticProps
function HomePage(props) {
        // The problem with the useState and useEffect approach is that this page will render twice
        // once on the inital load and then again when the loadedmeetups is set in useEffect
        // This effects the page load performance. Also since with pages router, the pages are pre-loaded.
        // The pre-loaded version of this page will be the inital render and will have no meetup data.
        // This can affect search engine optimization as the pre-loaded page will not have meetup data one can search for in
        // search engine like Google.
        // Therefore, we will take the getStaticProps approach.

        // const [loadedmeetups, setLoadedMeetups] = useState([]);

        // useEffect(() => {
        //         setLoadedMeetups(DUMMY_MEETUPS);
        // }, [])
        // return <MeetupList meetups={loadedmeetups} />;

        return (
                <Fragment>
                        {/* Head translates to metadata. Its good to have metadata of a page so it  can be picked up by google search. */}
                        <Head>
                                <title>React Meetups</title>
                                <meta
                                        name='description'
                                        content='Browse a huge list of highly active React meetups!'
                                />
                        </Head>
                        <MeetupList meetups={props.meetups} />;
                </Fragment>
        );
}

// method that will fetch data from backend during pre-rendering process during the build. npm run build
// This is a reserved NextJS function name. During pre-rendering process, NextJS will find and execute this function.
// This function needs to be placed in the page component file.
// This function will never execute on the client or server side since its executed during the build process.
// So with getStaticProps, the page is built and cached.
export async function getStaticProps() {
        // fetch data from an API
        // This code doesn't need to be in a handler inside api folder because this code will be executed server side
        // so none of this will be exposed to the client side.
        const client = await MongoClient.connect(
                'mongodb+srv://shafin071:unferth1@cluster0.vyigy.mongodb.net/?retryWrites=true&w=majority&appName=meetups'
        );
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const meetups = await meetupsCollection.find().toArray();

        client.close();


        return {
                props: {
                        meetups: meetups.map((meetup) => ({
                                title: meetup.title,
                                address: meetup.address,
                                image: meetup.image,
                                id: meetup._id.toString(),  // id is an obj and needs to be converted to string
                        })),
                },
                revalidate: 1  // seconds after which NextJS will re-generate the page with the latest data.
                // You can set the time interval based on your guess of the frequency of the data change in the page.
        };
}

// This is an alternative approach to getStaticProps. This function name is also a reserved name in NextJS.
// This function will not run during the build, but on the server after the build.
// The function will run for every incoming request.
// getStaticProps is better for data that doesn't change as frequently.
// getServerSideProps is better for data that changes mulple times every second.
// use getServerSideProps when you need access to the request object because getStaticProps doesn't have access to that.

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }


export default HomePage;