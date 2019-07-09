import React from 'react';
import { NotificationList, Tabs } from './children';
import { Panel, Title } from './notifications-panel.style';
import { Loader } from '@util-components';

type Props = {
  notifications: Array,
  markAsRead: Function,
  deleteNotification: () => void,
  fetchNewNotifications: () => void,
  filterNotification: () => void,
  tabs: Array<Object>,
  isLoading: boolean
};

const NotificationsPanel = ({
  notifications,
  markAsRead,
  deleteNotification,
  filterNotification,
  tabs,
  isLoading
}: Props) => (
  <Panel>
    <Title>Notifications</Title>
    {isLoading ? (
      <Loader absolute />
    ) : (
      <React.Fragment>
        <Tabs {...{ list: tabs, click: filterNotification }} />
        <NotificationList {...{ notifications, markAsRead, deleteNotification }} />
      </React.Fragment>
    )}
  </Panel>
);

export default NotificationsPanel;
