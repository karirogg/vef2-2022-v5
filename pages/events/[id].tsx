import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Event, Registration } from '../../types';

type IProps = {
  event: Event;
  registrations: Registration[];
};

const EventPage: NextPage<IProps> = ({ event, registrations }) => {
  return (
    <div>
      <h1>{event.name}</h1>
      <p>test</p>
      {registrations.map((registration: Registration) => (
        <>{registration.name}</>
      ))}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  // Call an external API endpoint to get posts
  const res = await fetch('http://vef2-v3-kari.herokuapp.com/events');
  const events = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = events.map((event: Event) => ({
    params: { id: event.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(
    `http://vef2-v3-kari.herokuapp.com/events/${params?.id}`
  );
  const result = await res.json();

  return {
    props: {
      event: result.event,
      registrations: result.registrations,
    },
  };
};

export default EventPage;
