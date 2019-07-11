import React from 'react';
import { LiveUpdate } from '@inrupt/solid-react-components';
import { Notifications } from './children';

type Props = {
  webId: string,
  inboxes: Array<string>
};

const Notification = React.memo(({ webId, inbox }: Props) => {
  const inboxUrl = inbox.map(item => item.path);

  return inboxUrl ? (
    <LiveUpdate subscribe={inboxUrl}>
      <Notifications {...{ webId, inbox }} />
    </LiveUpdate>
  ) : null;
});

export default Notification;
