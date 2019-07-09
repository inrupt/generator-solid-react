import React from 'react';
import { LiveUpdate } from '@inrupt/solid-react-components';
import { Notifications } from './children';

type Props = {
  webId: string,
  inboxes: Array<string>
};

const Notification = React.memo(({ webId, inbox }: Props) => {
  const inboxUrl = inbox.map(item => item.path);
  return webId ? (
    <LiveUpdate subscribe={inboxUrl}>
      <Notifications {...{ webId, inbox }} />
    </LiveUpdate>
  ) : null;
});

export default Notification;
