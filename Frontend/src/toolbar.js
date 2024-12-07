import React from "react";
import { DraggableNode } from "./draggableNode";

const nodeTypes = [
  { type: "customInput", label: "Input" },
  { type: "llm", label: "LLM" },
  { type: "customOutput", label: "Output" },
  { type: "text", label: "Text" },
  { type: "form", label: "Form" },
  { type: "customInput", label: "Form Input" },
  { type: "customOutput", label: "Output Node" },
  { type: "llm", label: "LLM2" },
  { type: "llm", label: "LLM3" },
];

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {nodeTypes.map((node) => (
          <DraggableNode key={node.type} type={node.type} label={node.label} />
        ))}
      </div>
    </div>
  );
};
