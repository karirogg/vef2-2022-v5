import { GetServerSideProps, NextPage } from 'next';
import { useContext } from 'react';
import { Event, Registration } from '../../types';
import { Context, IContext } from '../_theme';

type IProps = {
  event: Event;
  registrations: Registration[];
};

const EventPage: NextPage<IProps> = ({ event, registrations }) => {
  const { user, setUser }: IContext = useContext(Context);

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <h2>Skráningar</h2>
      {registrations.map((registration: Registration) => (
        <div key={registration.name}>{registration.name}</div>
      ))}
      {user && (
        <div>
          <h2>Skrá á viðburð</h2>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
