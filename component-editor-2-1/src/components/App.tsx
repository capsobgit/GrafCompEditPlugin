import axios from 'axios';
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
  useViewport,
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
      background: 'yellow',
      width: 100,
      border: 'solid',
      borderRadius: 75,
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
  const flowKey = 'flow_01';

  const getNodeId = () => `randomnode_${+new Date()}`;

  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const { setViewport } = useReactFlow();
  const [rfInstance, setRfInstance] = useState(null);
  //Props für Edgeoptions
  const [animate, setAnimate] = useState(false);

  const handleNewConnection = () => {
    setAnimate(!animate);
  };
  const defaultEdgeOptions = { animated: animate };

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback((connection: Connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);

  //const { x, y, zoom } = useViewport();
  console.log('widthProp, HeightProp: ', widthProp, heightProp);
  useEffect(() => {
    return () => {
      fitBounds({ x: 0, y: 0, width: widthProp, height: heightProp });
    };
  });

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      //Hier Datenbank call
      axios.put(`http://localhost:3002/api/put/${flowKey}`, flow);
    }
  }, [rfInstance]);

  const formatDataFromDatabaseToObject = (unformattedData) => {
    let stringData = JSON.stringify(unformattedData);
    const strWithoutBS = stringData.replace(/\\/g, '');
    const strWithoutDQ = strWithoutBS.replace(/"\[/g, '[');
    const resultString = strWithoutDQ.replace(/\]"/g, ']');
    return JSON.parse(resultString);
  };

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flowLocalFor = JSON.parse(localStorage.getItem(flowKey));
      console.log(flowLocalFor);
      //HTTP requests to express server
      const flowViewport = await axios.get(`http://localhost:3002/api/get/viewport`);
      const viewportData = flowViewport.data;
      const viewport = viewportData[0].viewport;

      const flowNodes = await axios.get(`http://localhost:3002/api/get/nodes`);
      const nodesData = flowNodes.data;
      const nodesArr = formatDataFromDatabaseToObject(nodesData);
      //unwrap node-object from array
      const nodes = nodesArr[0].nodes;

      const flowEdges = await axios.get(`http://localhost:3002/api/get/edges`);
      const edgesData = flowEdges.data;
      const edgesArr = formatDataFromDatabaseToObject(edgesData);
      //unwrap edge-object from array
      const edges = edgesArr[0].edges;

      if (nodes || edges || viewport) {
        const { x = 0, y = 0, zoom = 1 } = viewport;
        setNodes(nodes || []);
        setEdges(edges || []);
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
        // x: Math.random() * window.innerWidth - 100,
        // y: Math.random() * window.innerHeight,
        x: window.innerWidth / 4,
        y: window.innerHeight / 4,
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
      defaultEdgeOptions={defaultEdgeOptions}
    >
      <div className="save__controls">
        <button onClick={onSave}>save</button>
        <button onClick={onRestore}>restore</button>
        <button onClick={onAdd}>add node</button>
        <button onClick={handleNewConnection}>animate</button>
      </div>
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
};

export default App;
