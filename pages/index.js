import Head from "next/head";
import { Fragment } from "react";

import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

function Homepage(props) {
  return (
    <Fragment>
      <Head>
        <title>Next Js application</title>
        <meta name="secription" content="Hello world " />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       meetups: DUMMY_MEETPS,
//     },
//   };
// }
export async function getStaticProps() {
  // fetch("/api/meetups");

  MongoClient.connect();

  const client = await MongoClient.connect(
    "mongodb+srv://hello:Wb5vh4dpVHeceYlj@cluster0.ntnnd.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.data.title,
        address: meetup.data.address,
        image: meetup.data.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default Homepage;
