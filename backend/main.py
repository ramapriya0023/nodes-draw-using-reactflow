from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
import networkx as nx
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


class Node(BaseModel):
    id: str
    data: Dict[str, Any]


class Edge(BaseModel):
    source: str
    target: str


class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    G = nx.DiGraph()
    for node in pipeline.nodes:
        G.add_node(node.id)
    for edge in pipeline.edges:
        G.add_edge(edge.source, edge.target)


    is_dag = nx.is_directed_acyclic_graph(G)


    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}
