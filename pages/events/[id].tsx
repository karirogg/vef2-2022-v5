import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useContext, useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
import s2 from '../../components/LoginForm/LoginForm.module.scss';
import s from '../../styles/EventPage.module.scss';
import { BASE_URL } from '../../utils/consts';
import { Context, IContext } from '../../utils/context';
import { Event, Registration } from '../../utils/types';

type IProps = {
  event: Event;
  registrations: Registration[];
};

const EventPage: NextPage<IProps> = ({ event, registrations }) => {
  const { user, setUser }: IContext = useContext(Context);

  const [comment, setComment] = useState<string>('');
  const [liveRegistrations, setRegistrations] =
    useState<Registration[]>(registrations);
  const [errors, setErrors] = useState<string[]>([]);
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

      const registerRes = await fetch(`${BASE_URL}/events/${id}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await registerRes.json();

      if (result && user) {
        setRegistrations([
          ...liveRegistrations,
          { id: user.id, name: user.name, comment: comment },
        ]);
        setIsRegistered(true);
        setComment('');
      } else {
        setErrors([
          'Villa kom upp vi?? skr??ningu ?? vi??bur??. Vinsamlegast skr????u ??ig aftur inn',
        ]);
        setUser(null);
        await localStorage.setItem('token', '');
      }
    }
  }

  async function unregister() {
    const token = await localStorage.getItem('token');
    const registerRes = await fetch(`${BASE_URL}/events/${id}/register`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await registerRes.json();

    if (result && user) {
      const newRegistration = liveRegistrations.filter(
        (registration) => registration.id !== user.id
      );
      setRegistrations(newRegistration);
      setIsRegistered(false);
    } else {
      setErrors([
        'Villa kom upp vi?? afskr??ningu ?? vi??bur??. Vinsamlegast skr????u ??ig aftur inn',
      ]);
      setUser(null);
      await localStorage.setItem('token', '');
    }
  }

  return (
    <div className="main">
      <section>
        <h1 className={s.event__title}>{event.name}</h1>
        <p className={s.event__info}>{event.description}</p>
      </section>
      <section>
        <h2>Skr??ningar</h2>
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
          <h2>Skr?? ?? vi??bur??</h2>
          {!isRegistered ? (
            <form className={s2.form} onSubmit={registerUser}>
              <div className={s2.field}>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <Button>Skr?? ?? vi??bur??</Button>
            </form>
          ) : (
            <Button onClick={unregister}>Afskr??</Button>
          )}
        </section>
      )}
      {errors.map((error, i) => (
        <p key={i}>{error}</p>
      ))}
      <Link href="/">Til baka</Link>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(`${BASE_URL}/events/${params?.id}`);

  if (!res.ok) {
    return {
      notFound: true,
      props: {},
    };
  }

  const result = await res.json();

  return {
    props: {
      event: result.event,
      registrations: result.registrations,
    },
  };
};

export default EventPage;
