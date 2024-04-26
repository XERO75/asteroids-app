import React from 'react';
import './Header.scss';
const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center py-8">
      <i className="iconfont icon-logo text-2xl pr-4"></i>
      <span className="text-sm">BACKEND MINER</span>
    </header>
  );
};

export default Header;
