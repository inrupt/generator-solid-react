import { ldflexHelper } from './index';

export const sendNotification = async (opponent, content, createNotification, to) => {
  try {
    if (to) {
      return createNotification(content, to);
    }
    /**
     * If the opponent doesn't has inbox we show an error
     */
    throw new Error('Error the opponent does not has inbox to send notification');
  } catch (error) {
    throw new Error(error);
  }
};

export const findUserInboxes = async paths => {
  try {
    let inboxes = [];

    for await (const path of paths) {
      const { path: currentPath } = path;
      const inbox = await ldflexHelper.discoveryInbox(currentPath);

      if (inbox) {
        inboxes = [...inboxes, { ...path, path: inbox }];
      }
    }

    return inboxes;
  } catch (error) {
    throw new Error(error);
  }
};

export const getDefaultInbox = (inboxes, inbox1, inbox2) =>
  inboxes.find(inbox => inbox.name === inbox1) || inboxes.find(inbox => inbox.name === inbox2);
