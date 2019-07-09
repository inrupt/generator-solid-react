import React, { useCallback, useState, useEffect } from 'react';
import { TabsContainer, Tab } from './tabs.styles';

type Props = {
  activeName: string,
  list: Array<Object>,
  click: () => void
};

export const Tabs = ({ list, click, activeName }: Props) => {
  const [active, setActive] = useState(null);

  const filterByName = useCallback(
    async name => {
      const currentName = active === name ? '' : name;

      setActive(currentName);
      await click(currentName);
    },
    [list, active]
  );

  useEffect(() => {
    setActive(activeName);
  }, []);

  return (
    <TabsContainer>
      {list &&
        list.map(tab => (
          <Tab key={tab.path}>
            <button
              onClick={() => filterByName(tab.inboxName)}
              type="button"
              className={active === tab.inboxName ? 'active' : ''}
            >
              {tab.inboxName}
            </button>
          </Tab>
        ))}
    </TabsContainer>
  );
};
