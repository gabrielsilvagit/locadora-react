import React from 'react';
import { FaCar } from 'react-icons/fa';

import { Menu } from 'antd';

import { Container, Logo, Global } from './styles';

export default function Header() {
  const { SubMenu } = Menu;

  return (
    <>
      <Global />
      <Container>
        <Logo>
          <a href="/dashboard">
            <h1>Rent</h1>
            <FaCar size={40} color="#ffff00" />
          </a>
        </Logo>
        <Menu selectedKeys="mail" mode="horizontal">
          <Menu.Item key="rentals">
            <a href="/rentals">Rentals</a>
          </Menu.Item>
          <Menu.Item key="cleanings">
            <a href="/cleanings">Cleanings</a>
          </Menu.Item>
          <Menu.Item key="maitenances">
            <a href="/maintenances">Maintenances</a>
          </Menu.Item>
          <Menu.Item key="checkouts">
            <a href="/checkouts">Check Outs</a>
          </Menu.Item>
          <Menu.Item key="dropoffs">
            <a href="/dropoffs">Drop Offs</a>
          </Menu.Item>
          <SubMenu title="Registers ↓">
            <Menu.Item key="setting:1">
              <a href="/fuels">Fuels</a>
            </Menu.Item>
            <Menu.Item key="setting:2">
              <a href="/brands">Brands</a>
            </Menu.Item>
            <Menu.Item key="setting:3">
              <a href="/carmodels">Car Models</a>
            </Menu.Item>
            <Menu.Item key="setting:4">
              <a href="/categories">Categories</a>
            </Menu.Item>
            <Menu.Item key="setting:4">
              <a href="/vehicles">Vehicles</a>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Container>
    </>
  );
}
