import React from 'react';
import { Badge } from '@util-components';
import { BellIcon } from './bell.style';

const Bell = ({ unread, onClick, active }: Props) => (
  <BellIcon className={`bell-icon ${active ? 'active' : ''}`} onClick={onClick} type="button">
    <div className="icon">
      {unread > 0 && <Badge badge={unread} />}
      <img src="/img/icon/notification.svg" alt="notifications" />
    </div>
  </BellIcon>
);

export default Bell;
