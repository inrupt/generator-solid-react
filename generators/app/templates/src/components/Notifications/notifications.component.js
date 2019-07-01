import React, { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNotification, useWebId, useLiveUpdate } from '@inrupt/solid-react-components';
import { NotificationsWrapper } from './notifications.style';
import { Bell, NotificationsPanel } from './children';
import { useOnClickOutside } from '@hooks';
import { buildPathFromWebId } from '@utils';

let oldTimestamp;

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const webId = useWebId();
  const ref = useRef();
  const toggleNotifications = () => setIsOpen(!isOpen);
  const inboxUrl = buildPathFromWebId(webId, process.env.REACT_APP_TICTAC_INBOX);
  const { notifications, markAsRead, deleteNotification, fetchNotification } = useNotification(
    inboxUrl,
    webId
  );

  let { timestamp } = useLiveUpdate(inboxUrl);
  /**
   * pass date to string to compare time updates
   * @type {*|string}
   */
  timestamp = timestamp && timestamp.toString();
  useOnClickOutside(ref, () => setIsOpen(false));
  useEffect(() => {
    if (webId && inboxUrl) {
      /**
       * Render only when timestamps from live update are different
       */
      if (timestamp && oldTimestamp !== timestamp) {
        fetchNotification();
        oldTimestamp = timestamp;
      }
    }
  }, [webId, inboxUrl, timestamp]);
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
          {...{ notifications: notifications.notifications, markAsRead, deleteNotification }}
        />
      </CSSTransition>
    </NotificationsWrapper>
  );
};

export default Notifications;
