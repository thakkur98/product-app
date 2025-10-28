import styled from "styled-components";
import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavBarStyle>
      <div className="logo">ShopEasy</div>
      <div className="icons">
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✕" : "☰"}
        </div>
      </div>
    </NavBarStyle>
  );
};

export default NavBar;

export const NavBarStyle = styled.nav`
  width: 100%;
  height: 60px;
  background: #aaa;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid transparent;

  .logo {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: 1px;
  }

  .icons {
    display: none;
  }

  @media (max-width: 768px) {
    .nav-links {
      position: absolute;
      top: 60px;
      left: 0;
      width: 100%;
      background: #0d0d0d;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      padding: 15px 0;
      display: none;
      border-top: 1px solid #222;
    }

    .nav-links.active {
      display: flex;
    }

    .icons .menu-icon {
      display: block;
    }
  }
`;
