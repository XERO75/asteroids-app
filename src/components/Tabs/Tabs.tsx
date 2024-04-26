import React from 'react';
import { NavLink } from 'react-router-dom';

type TabData = {
  iconClass: string;
  label: string;
  to: string;
};

const Tab: React.FC<{ tab: TabData }> = ({ tab }) => (
  <li>
    <NavLink
      to={tab.to}
      className={({ isActive }) => `flex flex-col items-center  ${isActive ? 'text-green-light' : ''}`}
    >
      <i className={`iconfont ${tab.iconClass} text-4xl`} />
      <span className="text-gray">{tab.label}</span>
    </NavLink>
  </li>
);

const Tabs: React.FC = () => {
  const tabs: TabData[] = [
    { iconClass: 'icon-miners', label: 'Miners', to: '/miners' },
    { iconClass: 'icon-asteroids', label: 'Asteroids', to: '/asteroids' },
    { iconClass: 'icon-planets', label: 'Planets', to: '/planets' },
  ];

  return (
    <nav className="pb-12">
      <ul className="flex justify-center gap-8">
        {tabs.map((tab, index) => (
          <Tab key={index} tab={tab} />
        ))}
      </ul>
    </nav>
  );
};

export default Tabs;
