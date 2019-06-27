import React from 'react';
import { NotificationList } from './children';
import { Panel, Title } from './notifications-panel.style';

type Props = {
  notifications: Array,
  markAsRead: Function,
  deleteNotification: Function
};

const NotificationsPanel = (props: Props) => (
  <Panel>
    <Title>Notifications</Title>
    <NotificationList {...props} />
  </Panel>
);

export default NotificationsPanel;
