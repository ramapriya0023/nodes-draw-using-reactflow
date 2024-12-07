import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { TextNode } from "./nodes/textNode";
import { FormComponent } from "./components/formComponent";
import { BaseNode } from "./nodes/BaseNode";
import { getHandlePositions } from "./utils";

import "reactflow/dist/style.css";

const gridSize = 20;
const propOptions = { hideAttribution: true };

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const nodeTypes = {
  customInput: (props) => (
    <BaseNode
      {...props}
      nodeType="input"
      handlePositions={getHandlePositions("input")}
    />
  ),
  llm: (props) => (
    <BaseNode
      {...props}
      nodeType="llm"
      handlePositions={getHandlePositions("llm")}
    >
      <div>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  ),
  customOutput: (props) => (
    <BaseNode
      {...props}
      nodeType="output"
      handlePositions={getHandlePositions("output")}
    />
  ),
  text: TextNode,
  form: (props) => (
    <BaseNode
      {...props}
      nodeType="form"
      handlePositions={getHandlePositions("form")}
    >
      <FormComponent />
    </BaseNode>
  ),
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const connectionLineStyle = {
    stroke: "#6e31f375",
    strokeWidth: 2,
  };

  return (
    <div ref={reactFlowWrapper} style={{ width: "100vw", height: "80vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={(instance) => setReactFlowInstance(instance)}
        nodeTypes={nodeTypes}
        proOptions={propOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="simplebezier"
        connectionLineStyle={connectionLineStyle}
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
