import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface MButton extends ButtonProps {
  text: string;
}

const MaterialButton = (props: MButton): JSX.Element => {
  const { text, onClick, variant, disabled, type, color } = props;
  return (
    <Button
      variant={variant || 'contained'}
      color={color || 'primary'}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default MaterialButton;
