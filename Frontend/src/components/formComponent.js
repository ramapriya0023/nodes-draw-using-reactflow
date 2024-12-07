import React, { useState } from "react";
import {
  TextField,
  FormControl,
  Typography,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
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

const Label = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontSize: "16px",
  color: "#555",
}));

const FormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

export const FormComponent = (props) => {
  const [formData, setFormData] = useState({
    text: props.data?.text || "",
    checkbox1: props.data?.checkbox1 || false,
    checkbox2: props.data?.checkbox2 || false,
    radio: props.data?.radio || "option1",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({ ...prev, radio: e.target.value }));
  };

  return (
    <FormContainer>
      <FormControl fullWidth variant="outlined">
        <Label>Text Input</Label>
        <StyledTextField
          name="text"
          value={formData.text}
          onChange={handleInputChange}
          variant="outlined"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Checkboxes</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              name="checkbox1"
              checked={formData.checkbox1}
              onChange={handleCheckboxChange}
            />
          }
          label="Checkbox 1"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="checkbox2"
              checked={formData.checkbox2}
              onChange={handleCheckboxChange}
            />
          }
          label="Checkbox 2"
        />
      </FormControl>

      <FormControl component="fieldset">
        <FormLabel component="legend">Radio Buttons</FormLabel>
        <RadioGroup
          name="radio"
          value={formData.radio}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="option1"
            control={<Radio />}
            label="Option 1"
          />
          <FormControlLabel
            value="option2"
            control={<Radio />}
            label="Option 2"
          />
          <FormControlLabel
            value="option3"
            control={<Radio />}
            label="Option 3"
          />
        </RadioGroup>
      </FormControl>
    </FormContainer>
  );
};
