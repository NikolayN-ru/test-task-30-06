import { FC } from "react";

import "./button.css";

const Button: FC<{ active: () => void; name: string }> = ({ active, name }) => (
  <button className="button" onClick={active}>
    {name}
  </button>
);

export default Button;
