import React, { Fragment } from "react";
import { INRUPT_NOTIFICATION } from "@inrupt/lit-generated-vocab-inrupt-service";
import NotificationItem from "../NotificationItem";
import { List, NoNotifications } from "./notification-list.style";

type Props = {
  notifications: Array,
  markAsRead: Function,
  deleteNotification: Function
};
/**
 * Show notification list
 * @param notifications
 * @param markAsRead
 * @param deleteNotification
 * @returns {*}
 * @constructor
 */
const NotificationList = ({
  notifications,
  markAsRead,
  deleteNotification
}: Props) => (
  <Fragment>
    {notifications && notifications.length > 0 ? (
      <List>
        {notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            markAsRead={markAsRead}
            deleteNotification={deleteNotification}
          />
        ))}
      </List>
    ) : (
      <NoNotifications className="empty-list">
        {/* No notifications to show */}
        {INRUPT_NOTIFICATION.msgNoNotification.message}
      </NoNotifications>
    )}
  </Fragment>
);

export default NotificationList;
