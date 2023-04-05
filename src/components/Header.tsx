import { FC } from "react";
import styled from "styled-components";
import { ModalType } from "../App";
interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  openModal: (modalType: ModalType) => void;
}

const PUBLIC = process.env.PUBLIC_URL;

const HeaderContainer = styled.div`
  background-color: var(--background-shaded);
  color: var(--title-color);
  text-align: center;
  padding: 0.75rem;
  border-radius: 0.5rem;
  height: 3rem;
  max-width: 20rem;
  min-width: 16rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  margin: 2.5rem 0.75rem 0 0.75rem;
`;

const HeaderIcon = styled.img`
  height: 1rem;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 3.125rem;
`;

const Header: FC<HeaderProps> = ({ isDarkMode, toggleTheme, openModal }) => {
  const togglerImgSrc = isDarkMode
    ? `${PUBLIC}/toggle_switch_off.png`
    : `${PUBLIC}/toggle_switch_on.png`;

  return (
    <HeaderContainer>
      <HeaderIcon
        src={`${PUBLIC}/instructions_icon.png`}
        alt="click para instrucciones del juego"
        onClick={() => openModal("instructions")}
      />
      <h1>WORDLE</h1>
      <ButtonGroup>
        <HeaderIcon
          src={`${PUBLIC}/stats_icon.png`}
          alt="click para ver tus estadisticas"
          onClick={() => openModal("stats")}
        />
        <HeaderIcon
          src={togglerImgSrc}
          alt="click para modo dia / noche"
          onClick={toggleTheme}
        />
      </ButtonGroup>
    </HeaderContainer>
  );
};

export default Header;
