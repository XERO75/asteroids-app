import React from 'react';
import './Header.scss';
const Header: React.FC = () => {
  const HEADER_TEXT = 'BACKEND MINER';
  return (
    <header className="flex items-center  py-8">
      <i className="iconfont icon-logo text-2xl pr-4"></i>
      <span className="text-sm">{HEADER_TEXT}</span>
    </header>
  );
};

export default Header;
