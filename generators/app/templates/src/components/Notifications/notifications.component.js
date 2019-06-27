import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { NotificationsWrapper } from './notifications.style';
import { Bell, NotificationsPanel } from './children';
import useNotifications from './useNotifications';
import { useOnClickOutside } from '@hooks';

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const toggleNotifications = () => setIsOpen(!isOpen);
  const { notifications, unread, markAsRead, deleteNotification } = useNotifications();
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
