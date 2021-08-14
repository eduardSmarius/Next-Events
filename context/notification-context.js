import React, { useState } from 'react';

const NotificationCtx = React.createContext({});

export const NotificationCtxProvider = (props) => {
  const [isNotification, setIsNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({});

  const setIsNotif = (boolean) => {
    setIsNotification(boolean);
  };

  const setNotData = (data) => {
    setNotificationData(data);
  };

  const context = { isNotification, notificationData, setIsNotif, setNotData };

  return <NotificationCtx.Provider value={context}>{props.children}</NotificationCtx.Provider>;
};

export default NotificationCtx;
