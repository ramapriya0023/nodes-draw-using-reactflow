import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import SubmitButton from "./submit";
import { ReactFlowProvider } from "reactflow";

function App() {
  return (
    <ReactFlowProvider>
      <div>
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </div>
    </ReactFlowProvider>
  );
}

export default App;
