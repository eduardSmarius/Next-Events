import classes from './newsletter-registration.module.css';
import { useRef, useContext } from 'react';
import NotificationCtx from '../../context/notification-context';

function NewsletterRegistration() {
  const ctx = useContext(NotificationCtx);
  const newsletterRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    ctx.setIsNotif(true);
    ctx.setNotData({
      status: 'pending',
      title: 'Loading...',
      message: 'Adding newsletter to DB',
    });

    const clientEmail = newsletterRef.current.value;

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(clientEmail),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then((data) => {
          throw new Error(data.message || 'Something went wrong');
        });
      })
      .then((data) => {
        ctx.setNotData({
          status: 'success',
          title: 'Success',
          message: 'Email subscribed to our newsletter. Thank You!',
        });
      })
      .catch((err) => {
        ctx.setNotData({
          status: 'error',
          title: 'Error',
          message: 'Something went wrong...',
        });
      });

    setTimeout(() => ctx.setIsNotif(false), 3000);
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={newsletterRef}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
