import { Outlet } from 'react-router-dom';
import { Menu, Input } from 'semantic-ui-react';

export default function Layout() {
  return (
    <div style={{ padding: '1rem' }}>
      <Menu pointing>
        <Menu.Item
          name="home"
          //   active={activeItem === 'home'}
          //   onClick={this.handleItemClick}
        />
        <Menu.Item
          name="messages"
          //   active={activeItem === 'messages'}
          //   onClick={this.handleItemClick}
        />
        <Menu.Item
          name="friends"
          //   active={activeItem === 'friends'}
          //   onClick={this.handleItemClick}
        />
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
