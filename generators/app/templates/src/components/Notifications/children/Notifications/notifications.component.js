import React, { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNotification, useLiveUpdate } from '@inrupt/solid-react-components';
import { NotificationsWrapper } from './notifications.style';
import { Bell, NotificationsPanel } from '../index';
import { useOnClickOutside } from '@hooks';

let oldTimestamp;

type Props = {
  webId: String,
  inbox: String
};

/**
 * Notification wrapper for the Bell Icon and the Notifications Panel
 */
const Notifications = ({ webId, inbox }: Props) => {
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
  const currentTimestamp = timestamp && timestamp.toString();
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

  /**
   * If webId and notify instance exist we will init notifications, similar to componentDidMount
   */
  useEffect(() => {
    if (webId && notify) {
      initNotifications();
    }
  }, [inbox, notify]);

  /**
   * Fetch new notifications when liveUpdate's timestamp changes, similar to componentWillUpdate
   */
  useEffect(() => {
    if (currentTimestamp && oldTimestamp !== currentTimestamp) {
      initNotifications();
      oldTimestamp = currentTimestamp;
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
