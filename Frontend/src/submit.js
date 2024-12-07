import React, { useState } from "react";
import { useNodes, useEdges } from "reactflow";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  styled,
  Divider,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const StyledButton = styled("div")({
  minWidth: "80px",
  height: "50px",
  display: "flex",
  alignItems: "center",
  border: "2px solid #6e31f375",
  justifyContent: "center",
  flexDirection: "column",
  "&:hover": {
    boxShadow: "0 0px 10px #BC7DFF",
  },
  borderRadius: "15px",
});
const Label = styled("span")({
  fontFamily: "sans-serif",
  fontWeight: 500,
  color: "#6e31f3",
});

const RemoveIcon = styled(IconButton)({
  padding: 5,
  color: "#AD88C6",
  background: "#fff",
  "&:hover": {
    color: "#fff",
    background: "#AD88C6",
  },
});
const SubmitButton = () => {
  const nodes = useNodes();
  const edges = useEdges();
  const [open, setOpen] = useState(false);
  const [pipelineData, setPipelineData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const pipeline = { nodes, edges };
      const res = await axios.post(
        "http://127.0.0.1:8000/pipelines/parse",
        pipeline
      );
      const data = res.data;
      setPipelineData(data);
      setOpen(true);
    } catch (error) {
      console.error("Error submitting pipeline", error);
      alert("Failed to submit the pipeline. Check the console for details.");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <StyledButton onClick={handleSubmit}>
          <Label>Submit</Label>
        </StyledButton>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: "250px",
            maxWidth: "100%",
          },
        }}
      >
        <DialogTitle>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Label>Pipeline Details</Label>
            <RemoveIcon onClick={handleClose} size="small">
              <CloseIcon sx={{ height: "15px", width: "15px" }} />
            </RemoveIcon>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent>
          {pipelineData && (
            <>
              <p>Number of Nodes: {pipelineData.num_nodes}</p>
              <p>Number of Edges: {pipelineData.num_edges}</p>
              <p>Is DAG: {pipelineData.is_dag ? "Yes" : "No"}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubmitButton;
