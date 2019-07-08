import React, { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import moment from 'moment';
import { useNotification, useLiveUpdate } from '@inrupt/solid-react-components';
import { NotificationsWrapper } from './notifications.style';
import { Bell, NotificationsPanel } from '../index';
import { useOnClickOutside } from '@hooks';

let oldTimestamp;

const Notifications = ({ webId, inboxUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const toggleNotifications = () => setIsOpen(!isOpen);
  const {
    notifications,
    markAsReadNotification: markAsRead,
    deleteNotification,
    fetchNotification
  } = useNotification(webId);

  const { timestamp } = useLiveUpdate();
  /**
   * pass date to string to compare time updates
   * @type {*|string}
   */
  const currenTimestamp = timestamp && timestamp.toString();
  useOnClickOutside(ref, () => setIsOpen(false));
  useEffect(() => {
    if (webId && notifications) {
      fetchNotification(inboxUrl);
    }
  }, [webId, inboxUrl, notifications]);

  useEffect(() => {
    if (oldTimestamp !== currenTimestamp) {
      fetchNotification(inboxUrl);
      oldTimestamp = currenTimestamp;
    }
  }, [timestamp]);

  const notificationsOrder = notifications.notifications.sort(
    (a, b) =>
      // eslint-disable-next-line no-nested-ternary
      moment(b.sent).format('YYYYMMDD') - moment(a.sent).format('YYYYMMDD')
  );

  return (
    <NotificationsWrapper ref={ref}>
      <Bell unread={notifications.unread || 0} onClick={toggleNotifications} active={isOpen} />
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="notifications"
        unmountOnExit
        mountOnEnter
      >
        <NotificationsPanel
          {...{ notifications: notificationsOrder, markAsRead, deleteNotification }}
        />
      </CSSTransition>
    </NotificationsWrapper>
  );
};

export default Notifications;
