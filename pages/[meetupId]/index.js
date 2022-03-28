import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

import { Fragment } from "react";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
      </Head>
      <div className="detail">
        <img src={props.meetupData.image} alt="A first Meetup" />
        <h1>{props.meetupData.title}</h1>
        <address> {props.meetupData.address}</address>
        <p>{props.meetupData.description}</p>
        {console.log(props)}
      </div>
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://hello:Wb5vh4dpVHeceYlj@cluster0.ntnnd.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  console.log(meetups);
  client.close();

  return {
    fallback: blocking,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupid = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://hello:Wb5vh4dpVHeceYlj@cluster0.ntnnd.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupid),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.data.title,
        address: selectedMeetup.data.address,
        image: selectedMeetup.data.image,
        description: selectedMeetup.data.description,
      },
    },
  };
}

export default MeetupDetails;
