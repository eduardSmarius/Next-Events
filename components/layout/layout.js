import { Fragment, useContext } from 'react';
import Notification from '../ui/notification';
import MainHeader from './main-header';
import NotificationCtx from '../../context/notification-context';

function Layout(props) {
  const ctx = useContext(NotificationCtx);
  const { title, status, message } = ctx.notificationData;
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {ctx.isNotification && <Notification title={title} status={status} message={message} />}
    </Fragment>
  );
}

export default Layout;
