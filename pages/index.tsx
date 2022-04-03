import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { Event } from '../types';

type IProps = {
  events: Event[];
};

const Home: NextPage<IProps> = ({ events }) => {
  return (
    <div>
      <h1>Viðburðasíðan</h1>
      {events.map((event: Event) => (
        <div key={event.id}>
          <Link href={`/events/${event.id}`}>{event.name}</Link>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch('http://vef2-v3-kari.herokuapp.com/events');
  const events = await res.json();

  return {
    props: {
      events,
    },
  };
};

export default Home;
