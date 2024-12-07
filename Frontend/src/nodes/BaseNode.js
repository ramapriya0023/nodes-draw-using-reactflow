import React, { useState } from "react";
import { Handle } from "reactflow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useStore } from "../store";

const Root = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(1),
  border: "1px solid #AD88C6",
  width: "auto",
  height: "auto",
  margin: "none",
  "&:hover": {
    boxShadow: "0 0 20px #BC7DFF",
  },
  borderRadius: "15px",
  position: "relative",
}));

const RemoveIcon = styled(IconButton)({
  padding: 5,
  color: "#AD88C6",
  background: "#fff",
  "&:hover": {
    color: "#fff",
    background: "#AD88C6",
  },
});

const StyledButton = styled(Button)({
  backgroundColor: "#fff",
  border: "1px solid grey",
  color: "#555",
  padding: "10px 20px",
  borderRadius: "4px",
  textTransform: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minWidth: "120px",
  boxShadow: "none",
  transition: "all 0.3s ease",

  "& .MuiButton-endIcon": {
    marginLeft: 0,
  },

  "&:hover": {
    backgroundColor: "#F0F0F0",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
});

const StyledMenu = styled(Menu)({
  ".MuiPaper-root": {
    backgroundColor: "#fff",
    width: "186px",
  },
});

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: "#555",
  fontSize: "16px",
  padding: "10px 20px",

  "&:hover": {
    backgroundColor: "#F0F0F0",
  },
}));

const HandleStyle = styled("div")({
  position: "absolute",
  background: "#AD88C6",
});

const Heading = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(1),
  borderBottom: "1px solid #AD88C6",
  padding: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Label = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontSize: "16px",
  color: "#555",
}));

const SelectContainer = styled("div")(({ theme }) => ({
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

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

const defaultHandleStyle = {
  background: "#7752FE",
  height: "7px",
  width: "7px",
};

export const BaseNode = ({ id, data, nodeType, children, handlePositions }) => {
  const [currName, setCurrName] = useState(
    data?.name || id.replace(`${nodeType}-`, `${nodeType}_`)
  );
  const [type, setType] = useState(
    data.type || (nodeType === "input" || nodeType === "output" ? "Text" : "")
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const removeNode = useStore((state) => state.removeNode);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (value) => {
    setType(value);
    handleClose();
  };

  const handleRemove = () => {
    removeNode(id);
  };
  return (
    <Root>
      {handlePositions.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={`${handle.id}`}
          style={{ ...handle.style, ...defaultHandleStyle }}
          className={HandleStyle}
        />
      ))}
      <Heading>
        <Typography variant="h6" paddingLeft={"10px"}>
          {nodeType.charAt(0).toUpperCase() + nodeType.slice(1)}
        </Typography>
        <RemoveIcon onClick={handleRemove} size="small">
          <CloseIcon sx={{ height: "15px", width: "15px" }} />
        </RemoveIcon>
      </Heading>

      {(nodeType === "input" || nodeType === "output") && (
        <SelectContainer>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label variant="body1">Name</Label>
              <StyledTextField value={currName} onChange={handleNameChange} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label variant="body1">Type</Label>
              <StyledButton
                id="custom-button"
                aria-controls={anchorEl ? "custom-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={anchorEl ? "true" : undefined}
                onClick={handleClick}
                endIcon={<ArrowDropDownIcon />}
              >
                {type === "Text"
                  ? "Text"
                  : nodeType === "input"
                  ? "File"
                  : "Image"}
              </StyledButton>
              <StyledMenu
                id="custom-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{ "aria-labelledby": "custom-button" }}
              >
                <StyledMenuItem onClick={() => handleTypeChange("Text")}>
                  Text
                </StyledMenuItem>
                <StyledMenuItem
                  onClick={() =>
                    handleTypeChange(nodeType === "input" ? "File" : "Image")
                  }
                >
                  {nodeType === "input" ? "File" : "Image"}
                </StyledMenuItem>
              </StyledMenu>
            </div>
          </div>
        </SelectContainer>
      )}

      {children && <SelectContainer>{children}</SelectContainer>}
    </Root>
  );
};
