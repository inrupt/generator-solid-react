import React from 'react';
import { useWebId, LiveUpdate } from '@inrupt/solid-react-components';
import { buildPathFromWebId } from '@utils';
import { Notifications } from './children';

type Props = {
  webId: string
};

const Notification = React.memo(({ webId }: Props) => {
  const inboxUrl = buildPathFromWebId(webId, process.env.REACT_APP_TICTAC_INBOX);
  return webId ? (
    <LiveUpdate subscribe={inboxUrl}>
      <Notifications {...{ webId, inboxUrl }} />
    </LiveUpdate>
  ) : null;
});

export default Notification;
