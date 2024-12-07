import React, { useState, useEffect } from "react";
import { Position, useReactFlow, useUpdateNodeInternals } from "reactflow";
import { BaseNode } from "./BaseNode";
import { FormControl } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import TextBoxComponent from "../components/TextBoxComponent";

const Label = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontSize: "16px",
  color: "#555",
}));

const HandleHelperText = styled("div")((props) => ({
  position: "absolute",
  left: "-45px",
  top: props.handle.position.top,
  color: "#333",
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
}));

export const TextNode = (props) => {
  const [currText, setCurrText] = useState(props.data?.text || "");
  const [handles, setHandles] = useState([]);
  const reactFlow = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    updateHandles(currText);
  }, [currText, reactFlow]);

  const updateHandles = (text) => {
    const variables = Array.from(
      text.matchAll(/{{\s*(\w+)\s*}}/g),
      (m) => m[1]
    );

    const newHandles = variables.map((variable, index) => ({
      id: `${props.id}-${variable}-${index + 1}`,
      variable,
      position: { top: `${(index + 1) * 25}px` },
    }));

    setHandles(newHandles);
    updateNodeInternals(props.id);
  };

  const handlePositions = [
    ...handles.map((handle) => ({
      type: "target",
      position: Position.Left,
      id: handle.id,
      style: handle.position,
    })),
    { type: "source", position: Position.Right, id: "textnode-output" },
  ];

  const handleTextChange = (e) => {
    const text = e.target.value;
    setCurrText(text);
    updateHandles(text);
  };

  return (
    <BaseNode {...props} nodeType="text" handlePositions={handlePositions}>
      <FormControl fullWidth variant="outlined">
        <Label>Text</Label>

        <TextBoxComponent
          textValue={currText}
          onTextChange={handleTextChange}
        />
      </FormControl>

      {handles.map((handle) => (
        <HandleHelperText key={handle.id} handle={handle}>
          <span>{handle.variable}</span>
        </HandleHelperText>
      ))}
    </BaseNode>
  );
};
