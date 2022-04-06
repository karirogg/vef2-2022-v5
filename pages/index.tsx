import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import Footer from '../components/Footer/Footer';
import s from '../styles/Home.module.scss';
import { Event } from '../types';

type IProps = {
  events: Event[];
};

const Home: NextPage<IProps> = ({ events }) => {
  return (
    <div className="main">
      <h1>Viðburðasíðan</h1>
      <ul className={s.events}>
        {events.map((event: Event) => (
          <li className={s.events__event} key={event.id}>
            <Link href={`/events/${event.id}`}>
              <a className={s.events__eventLink}>{event.name}</a>
            </Link>
            <p className={s.events__eventDescription}>{event.description}</p>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch('http://vef2-v3-kari.herokuapp.com/events');
  const events = await res.json();

  return {
    props: {
      events,
    },
  };
};

export default Home;
