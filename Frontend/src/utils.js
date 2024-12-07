import { Position } from "reactflow";

const inputHandlePositions = [
  {
    id: "inputnode-output-1",
    type: "source",
    position: Position.Right,
  },
];

const llmHandlePositions = [
  {
    type: "target",
    id: "input-1",
    position: Position.Left,
    style: { top: `${100 / 3}%` },
  },
  {
    type: "target",
    position: Position.Left,
    id: "input-2",
    style: { top: `${200 / 3}%` },
  },
  {
    type: "source",
    id: "output-1",
    position: Position.Right,
  },
];

const outputHandlePositions = [
  {
    id: "outputnode-input-1",
    type: "target",
    position: Position.Left,
  },
];

const formHandlePositions = [
  { type: "source", position: Position.Right, id: "top" },
  { type: "target", position: Position.Left, id: "bottom" },
];

export const getHandlePositions = (nodeType) => {
  switch (nodeType) {
    case "input":
      return inputHandlePositions;
    case "llm":
      return llmHandlePositions;
    case "form":
      return formHandlePositions;
    case "output":
      return outputHandlePositions;
    default:
      return [];
  }
};
