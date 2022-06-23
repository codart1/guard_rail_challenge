import React, { useMemo } from 'react';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';
import { Menu, Input } from 'semantic-ui-react';

const LINKS = [
  {
    to: '/result',
    name: 'Submit',
  },
  {
    to: '/result/list',
    name: 'Result List',
  },
];

export default function Layout() {
  const navigate = useNavigate();

  const activeAwareLinks = LINKS.map(({ name, to }) => (
    <Menu.Item
      name={name}
      // It's safe to call `useMatch` here since
      // hook calls order are the same between re-render
      // thus won't break rules of hook
      active={!!useMatch(to)}
      onClick={() => navigate(to)}
    />
  ));

  return (
    <div style={{ padding: '1rem' }}>
      <Menu pointing>
        {activeAwareLinks.map((link, i) => (
          <React.Fragment key={i}>{link}</React.Fragment>
        ))}
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Outlet />
    </div>
  );
}
