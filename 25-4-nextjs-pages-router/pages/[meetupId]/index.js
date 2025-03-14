import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';
import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
        return (
                <Fragment>
                        <Head>
                                <title>{props.meetupData.title}</title>
                                <meta name='description' content={props.meetupData.description} />
                        </Head>
                        <MeetupDetail
                                image={props.meetupData.image}
                                title={props.meetupData.title}
                                address={props.meetupData.address}
                                description={props.meetupData.description}
                        />
                </Fragment>
        );
}


// This is also a NextJS special function. 
// Needed when you use getStaticProps.
// This is not needed for getServerSideProps or statis pages that has no dynamic data.
// Remember  getStaticProps a page is pre-generated during the build process.
// This means that of course, NextJS needs to pre-generate all versions of this dynamic page in advance
// for all the supported IDs. Because since this is dynamic, NextJS needs to know for which ID values 
// it should pre-generate the page.
export async function getStaticPaths() {

        const client = await MongoClient.connect(
                'mongodb+srv://shafin071:unferth1@cluster0.vyigy.mongodb.net/?retryWrites=true&w=majority&appName=meetups'
        );
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        // find takes 2 args. First object is a filter which is empty since we want to get all the data
        // 2nd arg defines the fields we want to fetch. _id: 1 means only fetch the ids.
        const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

        client.close();

        return {
                // This property tells NextJS if paths contain all the meetupId values.
                // 'blocking' or True means not all the Ids are listed in the paths. 
                // So if it encounters an Id the page wasn't pre-generated for, it will generate it on the fly.

                // With True, the user will see an empty page until all the data content is loaded to the page.
                // With 'blocking' the page won't load until it has all the data and the page is generated.

                // False means all the Ids are listed in the paths. If it encounters an Id the page wasn't pre-generated for, it'll throw a 404.
                fallback: 'blocking',

                // paths contains all the params keys with all the meetupIds.
                paths: meetups.map((meetup) => ({
                        params: { meetupId: meetup._id.toString() },
                })),
        };
}

// method that will fetch data from backend during pre-rendering process during the build. npm run build.
// NOTE: you cannot use hooks like useRouter() (see pages-router-intro) inside getStaticProps.
// Good thing getStaticProps also gets the context object and we can get the meetupId from there.
export async function getStaticProps(context) {
        // fetch data for a single meetup

        const meetupId = context.params.meetupId;

        const client = await MongoClient.connect(
                'mongodb+srv://shafin071:unferth1@cluster0.vyigy.mongodb.net/?retryWrites=true&w=majority&appName=meetups'
        );
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        // when searching for an Id in MongDB, we need to convert the id str back to an object
        const selectedMeetup = await meetupsCollection.findOne({
                _id: new ObjectId(meetupId),
        });

        client.close();

        console.log(meetupId);

        return {
                props: {
                        meetupData: {
                                id: selectedMeetup._id.toString(),  // convert the Id obj back to string
                                title: selectedMeetup.title,
                                address: selectedMeetup.address,
                                image: selectedMeetup.image,
                                description: selectedMeetup.description,
                        },
                },
        };
}

export default MeetupDetails;