import {graphModel, graphModel1, graphModelres} from "./ForMyGraphModel";
import {Graph, IEdge, IGraph, IVertex} from 'graphlabs.core.graphs';
import { store } from 'graphlabs.core.template';
import { message_0, message_0_changing, num_0, num_0_changing, mark_0, mark_0_changing, My_Graphs, My_Graphs_changing, mark_1, mark_1_changing } from './ForMeVars';
import * as d3 from "d3";

function MyVisualizer(graph: IGraph<IVertex, IEdge>, my_class:string){
    d3.select(`svg.${my_class}`).attr("width","98%").attr("height","100%");

    if (graph.vertices.length===1){
        window.alert(`${d3.select(`svg.${my_class}`).style("width")}`);
        d3.select(`svg.${my_class}`).append("svg").attr("width", "100%").attr("height", "100%")
            .append("circle").attr("cx", "50%").attr("cy", "50%").attr("r", 30)
            .attr("stroke","black").attr("stroke-width",5).attr("fill","rgb(238, 238, 238)");

        d3.select(`svg.${my_class}`).select("svg").append("text").attr("x","50%").attr("y","52%")
            .attr("text-anchor","middle").style("fill","rgb(0, 0, 0)").style("font-family", "sans-serif")
            .style("text-anchor","middle").style("padding-top","50%").style("padding-left","25%")
            .style("padding-right","25%").text(`${graph.vertices[0].name}`);
    }
    else{
        let n:number = graph.vertices.length; // number of vertices
        let R:number = 15 * ( 1 + 1/(Math.pow(n,3/5))); // radius of vertices
        let w:number = parseFloat(d3.select(`svg.${my_class}`).style("width").slice(0,d3.select(`svg.${my_class}`).style("width").length-2)); // width
        let h:number = w; // height
        d3.select(`svg.${my_class}`).attr("height",h); // set height in html
        let r:number = w/2-R-10; // radius of graph
        let phi_0:number = 0; // phi 0
        let phi_i:number = phi_0; // phi i
        let x_0:number = w/2; // x 0
        let y_0:number = h/2; // y 0
        let x:number[] = [];
        let y:number[] = [];
        for (let i = 0; i<graph.vertices.length; i++){
            phi_i += 360/n;
            x[i] = x_0 - r * Math.sin(Math.PI*(2+phi_i/180));
            y[i] = y_0 + r * Math.cos(Math.PI*(2+phi_i/180));

        }
        let i = 0;
        let j = 0;
        let vert_names:string[] = [];
        graph.vertices.forEach((v:IVertex)=>{
            vert_names[j]=v.name;
            j++;
        });
        graph.edges.forEach((e:IEdge)=>{
            //let z = Math.min(parseInt(d3.select(`svg.${my_class}`).select(`svg.vert_num_${e.vertexOne.name}`).style("z")),parseInt(d3.select(`svg.${my_class}`).select(`svg.vert_num_${e.vertexTwo.name}`).style("z")));
            d3.select(`svg.${my_class}`).append("line").style('stroke', 'black').attr("stroke-width",5)//.style("z",z-10)
                .attr('x1', x[vert_names.indexOf(e.vertexOne.name)])
                .attr('y1', y[vert_names.indexOf(e.vertexOne.name)])
                .attr('x2', x[vert_names.indexOf(e.vertexTwo.name)])
                .attr('y2', y[vert_names.indexOf(e.vertexTwo.name)]);
        });
        graph.vertices.forEach((v:IVertex)=>{
            d3.select(`svg.${my_class}`).append("svg").attr("class",`vert_num_${v.name}`).attr("width", "100%").attr("height", "100%")
                .append("circle").attr("cx", x[i]).attr("cy", y[i]).attr("r", R)
                .attr("stroke","black").attr("stroke-width",5).attr("fill","rgb(238, 238, 238)");
            d3.select(`svg.${my_class}`).select(`svg.vert_num_${v.name}`).append(`text`).attr("x",x[i]).attr("y",y[i]+4) // знак = 8 пикселей в высоту, поэтому ловим середину так сказать(
                .attr("text-anchor","middle").style("fill","rgb(0, 0, 0)").style("font-family", "sans-serif")
                .style("text-anchor","middle").style("padding-top","50%").style("padding-left","25%")
                .style("padding-right","25%").text(`${v.name}`);
            //vert_names[i]=v.name;
            i++;
        });

    }
}

export {MyVisualizer};