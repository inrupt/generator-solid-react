import React, { useCallback } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Item, Body, Message, Meta, MarkAsRead, Delete } from './notification-item.style';

type Props = {
  notification: Object,
  markAsRead: Function,
  children: React.ReactNode,
  deleteNotification: (fileName: string) => void
};

const NotificationItem = ({ notification, markAsRead, children, deleteNotification }: Props) => {
  const { read } = notification;
  const currentRead = read ? JSON.parse(read) : false;
  const { sender } = notification;
  const redirectTo = useCallback(async () => {
    if (notification.target) {
      await markAsRead(notification.path, notification.id);
      window.location = notification.target;
    }
  }, [notification]);

  return (
    <Item read={currentRead}>
      <a href={notification.sender}>
        <img src="/img/icon/empty-profile.svg" alt="Creator" />
      </a>
      <Body>
        <Message onClick={redirectTo}>
          <strong>{sender.name}</strong> {notification.summary}
        </Message>
        <Meta>
          <span className="moment">{moment(notification.sent).fromNow()}</span>
          {children}
        </Meta>
      </Body>
      {!currentRead && (
        <MarkAsRead
          type="button"
          className="delete"
          onClick={() => markAsRead(notification.path, notification.id)}
        >
          <FontAwesomeIcon icon="eye" />
        </MarkAsRead>
      )}
      <Delete
        type="button"
        className="delete"
        onClick={() => deleteNotification(notification.path)}
      >
        <FontAwesomeIcon icon="times-circle" />
      </Delete>
    </Item>
  );
};

export default NotificationItem;
