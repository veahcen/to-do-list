import React, { FC } from 'react';

import plus from "../../../resources/plus.svg";
import burger from "../../../resources/hamburger.svg";
import "./myButton.scss";

interface IMyButton {
  onClick?: (e: React.MouseEvent) => void,
  text: string,
  isRed: boolean,
  disable?: boolean
}

const MyButton: FC<IMyButton> = ({ onClick, text, isRed, disable }) => {
  let disabledButton = disable ? ' disable' : '';
  return (
    <button disabled={disable} style={isRed? {background: '#b14a4b'} : {background: '#527cb8'}} className={"myButton"+disabledButton} onClick={onClick}>
      {!isRed && <img src={plus} alt='plus' />}
      {text}
      {isRed && <img src={burger} alt='burger' />}
    </button>
  );
};

export default MyButton;