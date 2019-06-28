import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNotification, useWebId } from '@inrupt/solid-react-components';
import { NotificationsWrapper } from './notifications.style';
import { Bell, NotificationsPanel } from './children';
import { useOnClickOutside } from '@hooks';
import { buildPathFromWebId } from '@utils';


const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const webId = useWebId();
  const ref = useRef();
  const toggleNotifications = () => setIsOpen(!isOpen);
  const inboxUrl = buildPathFromWebId(webId, process.env.REACT_APP_TICTAC_INBOX);
  const { notifications, unread, markAsRead, deleteNotification } = useNotification(inboxUrl, webId);
  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <NotificationsWrapper ref={ref}>
      <Bell unread={unread} onClick={toggleNotifications} active={isOpen} />
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="notifications"
        unmountOnExit
        mountOnEnter
      >
        <NotificationsPanel {...{ notifications, markAsRead, deleteNotification }} />
      </CSSTransition>
    </NotificationsWrapper>
  );
};

export default Notifications;
