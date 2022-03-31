import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  MiniMap,
  Controls,
  useReactFlow,
} from 'react-flow-renderer';
import CustomNode from '../components/CustomNode';
import '../styles/index.css';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'customNode',
    data: { label: 'Node 1' },
    position: { x: 0, y: 50 },
    style: {
      background: 'green',
      width: 50,
      border: 'solid',
      borderRadius: 50,
      padding: 10,
    },
  },
];

const initialEdges: Edge[] = [];

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

interface DimProp {
  widthProp: number;
  heightProp: number;
}

const App = (props: DimProp) => {
  const { widthProp, heightProp } = props;

  //Panel width und height übernehmen
  const { fitBounds } = useReactFlow();
  //Panel wird mit props für width,height gesetzt

  useEffect(() => {
    return () => {
      fitBounds({ x: 0, y: 0, width: widthProp, height: heightProp });
    };
  });
  const flowKey = 'flow_01';

  const getNodeId = () => `randomnode_${+new Date()}`;

  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    [setEdges]
  );

  const [rfInstance, setRfInstance] = useState(null);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      //Hier Datenbank call
    }
  }, [rfInstance]);

  const { setViewport } = useReactFlow();

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };
    restoreFlow();
  }, [setNodes, setViewport]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: 'Added node' },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitViewOptions={fitViewOptions}
      nodeTypes={nodeTypes}
      onInit={setRfInstance}
      fitView
    >
      <div className="save__controls">
        <button onClick={onSave}>save</button>
        <button onClick={onRestore}>restore</button>
        <button onClick={onAdd}>add node</button>
        <button onClick={null}></button>
      </div>
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
};

export default App;
