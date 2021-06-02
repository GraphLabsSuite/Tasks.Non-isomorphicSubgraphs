import { IGraph, IVertex, IEdge, Graph } from "graphlabs.core.graphs";

let graphModel:  IGraph<IVertex, IEdge> = new Graph() as unknown as IGraph<IVertex, IEdge>;
let init:(graph: IGraph<IVertex, IEdge>) => void;
init = function (graph: IGraph<IVertex, IEdge>) {
    graphModel = graph;
}

let graphModel1:  IGraph<IVertex, IEdge> = new Graph() as unknown as IGraph<IVertex, IEdge>;
let init1:(graph: IGraph<IVertex, IEdge>) => void;
init1 = function (graph: IGraph<IVertex, IEdge>) {
    graphModel1 = graph;
}

let graphModelres:  IGraph<IVertex, IEdge> = new Graph() as unknown as IGraph<IVertex, IEdge>;
let initres:(graph: IGraph<IVertex, IEdge>) => void;
initres = function (graph: IGraph<IVertex, IEdge>) {
    graphModelres = graph;
}

export { init1, graphModel1, initres, graphModelres, init, graphModel };