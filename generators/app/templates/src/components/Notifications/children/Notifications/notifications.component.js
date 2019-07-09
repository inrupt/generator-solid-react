import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNotification, useLiveUpdate } from '@inrupt/solid-react-components';
import { NotificationsWrapper } from './notifications.style';
import { Bell, NotificationsPanel } from '../index';
import { useOnClickOutside } from '@hooks';

let oldTimestamp;

const Notifications = ({ webId, inbox }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef();
  const toggleNotifications = () => setIsOpen(!isOpen);
  const {
    notification,
    markAsReadNotification: markAsRead,
    deleteNotification,
    fetchNotification,
    filterNotification
  } = useNotification(webId);

  const { timestamp } = useLiveUpdate();
  const { notifications, unread, notify } = notification;

  /**
   * pass date to string to compare time updates
   * @type {*|string}
   */
  const currenTimestamp = timestamp && timestamp.toString();
  useOnClickOutside(ref, () => setIsOpen(false));

  const initNotifications = async () => {
    setIsLoading(true);
    console.log('hello');
    await fetchNotification(inbox);
    setIsLoading(false);
  };

  useEffect(() => {
    if (webId && notify) {
      initNotifications();
    }
  }, [inbox, notify]);

  useEffect(() => {
    if (currenTimestamp && oldTimestamp !== currenTimestamp) {
      initNotifications();
      oldTimestamp = currenTimestamp;
    }
  }, [timestamp]);
  return (
    <NotificationsWrapper ref={ref}>
      <Bell unread={unread || 0} onClick={toggleNotifications} active={isOpen} />
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="notifications"
        unmountOnExit
        mountOnEnter
      >
        <NotificationsPanel
          {...{
            notifications,
            markAsRead,
            deleteNotification,
            tabs: inbox,
            filterNotification,
            isLoading
          }}
        />
      </CSSTransition>
    </NotificationsWrapper>
  );
};

export default Notifications;
