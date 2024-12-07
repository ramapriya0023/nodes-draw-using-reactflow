import { styled } from "@mui/material";

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };
  const DraggableButton = styled("div")({
    cursor: "grab",
    minWidth: "80px",
    height: "50px",
    padding: "0px 7px",
    display: "flex",
    alignItems: "center",
    borderRadius: "8px",
    border: "2px solid #6e31f375",
    justifyContent: "center",
    flexDirection: "column",
    "&:hover": {
      boxShadow: "0 0px 10px #BC7DFF",
    },
    borderRadius: "15px",
  });
  const Label = styled("span")({
    color: "#6e31f3",
    fontFamily: "sans-serif",
    fontWeight: 500,
  });
  return (
    <DraggableButton
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      style={{}}
      draggable
    >
      <Label>{label}</Label>
    </DraggableButton>
  );
};
