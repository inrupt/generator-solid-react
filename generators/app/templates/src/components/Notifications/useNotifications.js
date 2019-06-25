import { useState, useEffect, useCallback } from 'react';

const testNotifications = [
  {
    id: '2343243-23432',
    title: 'Test',
    message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, temporibus.',
    sent: '20190520T12:34:54',
    recipients: ['https://recipient.provider.com/profile/card#me'],
    image: 'https://app.com/thing/image.jpg',
    link: 'https://app.com/thing/12',
    read: false
  },
  {
    id: '2343243-23433',
    title: 'Test',
    message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, temporibus.',
    sent: '20190520T12:34:54',
    recipients: ['https://recipient.provider.com/profile/card#me'],
    image: 'https://app.com/thing/image.jpg',
    link: 'https://app.com/thing/12',
    read: true
  },
  {
    id: '2343243-23434',
    title: 'Test',
    message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, temporibus.',
    sent: '20190520T12:34:54',
    recipients: ['https://recipient.provider.com/profile/card#me'],
    image: 'https://app.com/thing/image.jpg',
    link: 'https://app.com/thing/12',
    read: false
  },
  {
    id: '2343243-23435',
    title: 'Test',
    message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, temporibus.',
    sent: '20190520T12:34:54',
    recipients: ['https://recipient.provider.com/profile/card#me'],
    image: 'https://app.com/thing/image.jpg',
    link: 'https://app.com/thing/12',
    read: true
  },
  {
    id: '2343243-23436',
    title: 'Test',
    message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, temporibus.',
    sent: '20190520T12:34:54',
    recipients: ['https://recipient.provider.com/profile/card#me'],
    image: 'https://app.com/thing/image.jpg',
    link: 'https://app.com/thing/12',
    read: false
  },
  {
    id: '2343243-23437',
    title: 'Test',
    message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, temporibus.',
    sent: '20190520T12:34:54',
    recipients: ['https://recipient.provider.com/profile/card#me'],
    image: 'https://app.com/thing/image.jpg',
    link: 'https://app.com/thing/12',
    read: false
  },
  {
    id: '2343243-23438',
    title: 'Test',
    message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, temporibus.',
    sent: '20190520T12:34:54',
    recipients: ['https://recipient.provider.com/profile/card#me'],
    image: 'https://app.com/thing/image.jpg',
    link: 'https://app.com/thing/12',
    read: false
  }
];

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(4);

  useEffect(() => {
    setNotifications(testNotifications);
    const unreadNotifications = testNotifications.filter(notification => !notification.read).length;
    setUnread(unreadNotifications);
  }, []);

  const markAsRead = useCallback(notification => {
    const newNotifications = notifications.map(item =>
      notification.id === item.id ? { ...item, read: true } : item
    );
    setNotifications(newNotifications);
    console.log('Mark as Read', notification);
  });

  const deleteNotification = useCallback(notification => {
    const newNotifications = notifications.filter(item => !notification.id === item.id);
    setNotifications(newNotifications);
    console.log('Delete', notification);
  });
  return {
    notifications,
    unread,
    markAsRead,
    deleteNotification
  };
};

export default useNotification;
