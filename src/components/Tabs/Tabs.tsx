import React from 'react';
import { NavLink } from 'react-router-dom';

type TabData = {
  iconClass: string;
  label: string;
  to: string;
};

const Tab: React.FC<{ tab: TabData }> = ({ tab }) => (
  <NavLink
    to={tab.to}
    className={({ isActive }) =>
      `flex flex-col py-2 items-center ${isActive ? 'text-green-light outline outline-gray-light shadow-dark shadow-2xl rounded-lg' : ''}`
    }
  >
    <i className={`iconfont ${tab.iconClass} text-4xl`} />
    <span className="text-gray">{tab.label}</span>
  </NavLink>
);

const Tabs: React.FC = () => {
  const tabs: TabData[] = [
    { iconClass: 'icon-miners', label: 'Miners', to: '/miners' },
    { iconClass: 'icon-asteroids', label: 'Asteroids', to: '/asteroids' },
    { iconClass: 'icon-planets', label: 'Planets', to: '/planets' },
  ];

  return (
    <nav className="pb-12 flex items-center justify-center">
      <ul className="flex w-80 justify-center  gap-10">
        {tabs.map((tab, index) => (
          <li className="w-1/3">
            <Tab key={index} tab={tab} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Tabs;
