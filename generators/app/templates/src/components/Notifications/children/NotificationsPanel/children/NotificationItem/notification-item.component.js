import React, { useCallback } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Item, Body, Message, Meta, MarkAsRead } from './notification-item.style';

type Props = { notification: Object, markAsRead: Function, children: React.ReactNode };

const NotificationItem = ({ notification, markAsRead, children }: Props) => {
  const { read } = notification;
  const currentRead = JSON.parse(read);

  const redirectTo = useCallback(() => {
    if (notification.target) {
      window.location = notification.target;
    }
  }, [notification]);

  return (
    <Item read={currentRead}>
      <a href={notification.sender}>
        <img src="img/icon/empty-profile.svg" alt="Creator" />
      </a>
      <Body>
        <Message onClick={redirectTo}>
          <strong>{notification.sender}</strong> {notification.summary}
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
    </Item>
  );
};

export default NotificationItem;
