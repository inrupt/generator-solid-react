import React, { useState, useRef, useEffect } from 'react';
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
  /**
   * Notification hook from solid-react-components
   */
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

  /**
   * Fetch notifications from inbox
   * @returns {Promise<void>}
   */
  const initNotifications = async () => {
    try {
      setIsLoading(true);
      await fetchNotification(inbox);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    /**
     * If webId and notify instance exist we will init notifications
     */
    if (webId && notify) {
      initNotifications();
    }
  }, [inbox, notify]);

  /**
   * Fetch new notifications when liveUpdate time change
   */
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
