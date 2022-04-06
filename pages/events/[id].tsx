import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useContext, useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
import s2 from '../../components/LoginForm/LoginForm.module.scss';
import s from '../../styles/EventPage.module.scss';
import { Event, Registration } from '../../types';
import { Context, IContext } from '../_theme';

type IProps = {
  event: Event;
  registrations: Registration[];
};

const EventPage: NextPage<IProps> = ({ event, registrations }) => {
  const { user }: IContext = useContext(Context);
  const [comment, setComment] = useState<string>('');
  const [liveRegistrations, setRegistrations] =
    useState<Registration[]>(registrations);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (user) {
      console.log(user.id);
      console.log(registrations);
      const userRegistrations = registrations.filter(
        (registration) => registration.id === user.id
      );
      if (userRegistrations.length > 0) setIsRegistered(true);
    }
  }, [user, registrations]);

  async function registerUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const token = await localStorage.getItem('token');

    if (token && token !== '') {
      const data = { comment };

      const registerRes = await fetch(
        `http://vef2-v3-kari.herokuapp.com/events/${id}/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await registerRes.json();

      if (result && user) {
        setRegistrations([
          ...liveRegistrations,
          { id: user.id, name: user.name, comment: comment },
        ]);
        setIsRegistered(true);
        setComment('');
      }
    }
  }

  async function unregister() {
    const token = await localStorage.getItem('token');
    const registerRes = await fetch(
      `http://vef2-v3-kari.herokuapp.com/events/${id}/register`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await registerRes.json();

    if (result && user) {
      const newRegistration = liveRegistrations.filter(
        (registration) => registration.id !== user.id
      );
      setRegistrations(newRegistration);
      setIsRegistered(false);
    }
  }

  return (
    <div className="main">
      <section>
        <h1 className={s.event__title}>{event.name}</h1>
        <p className={s.event__info}>{event.description}</p>
      </section>
      <section>
        <h2>Skráningar</h2>
        <ul className={s.event__registered}>
          {liveRegistrations.map((registration: Registration) => (
            <li className={s.registered__item} key={registration.name}>
              <p className={s.event__registeredName}>{registration.name}</p>
              <p className={s.event__registeredComment}>
                {registration.comment}
              </p>
            </li>
          ))}
        </ul>
      </section>
      {user && (
        <section>
          <h2>Skrá á viðburð</h2>
          {!isRegistered ? (
            <form className={s2.form} onSubmit={registerUser}>
              <div className={s2.field}>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <Button>Skrá á viðburð</Button>
            </form>
          ) : (
            <Button onClick={unregister}>Afskrá</Button>
          )}
        </section>
      )}
      <Link href="/">Til baka</Link>
      <Footer />
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
