import React, { useState, useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)({
  width: "100%",
  "& .MuiInputBase-input": {
    resize: "none",
    overflow: "hidden",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid #BEBEBE",
    },
    "&:hover fieldset": {
      border: "1px solid #707070",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #707070",
      boxShadow: "none",
    },
  },
});

const TextBoxComponent = ({ onTextChange, textValue }) => {
  const [textBoxWidth, setTextBoxWidth] = useState(200);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef?.current?.clientHeight) {
      setTextBoxWidth(textBoxWidth + 5);
    }
  }, [textRef?.current?.clientHeight]);

  return (
    <div
      style={{
        width: `${textBoxWidth}px`,
      }}
    >
      <StyledTextField
        ref={textRef}
        fullWidth
        value={textValue}
        onChange={onTextChange}
        multiline
        variant="outlined"
        minRows={1}
        maxRows={Infinity}
      />
    </div>
  );
};

export default TextBoxComponent;
