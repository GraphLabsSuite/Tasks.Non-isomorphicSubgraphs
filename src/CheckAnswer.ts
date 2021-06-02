import {graphModel, graphModel1, graphModelres} from "./ForMyGraphModel";
import {Graph, IEdge, IGraph, IVertex} from 'graphlabs.core.graphs';
import { store } from 'graphlabs.core.template';
import {message_0, message_0_changing, num_0, num_0_changing, mark_0, mark_0_changing, My_Graphs, My_Graphs_changing} from './ForMeVars';

function LastCheckingAnswer(){
    mark_0_changing(Math.round(100*mark_0/(My_Graphs.length+mark_0)));
    window.alert(`Вы вполнили задания на оценку: ${mark_0}`);
    store.getState().notifier.score = mark_0; // здесь я меняю оценку.
    return Promise.resolve({success: mark_0 === 100, fee: mark_0});
}

function CheckingAnswer(){
    let get_str = Vibor_Vertices_For_Check(graphModel, graphModel1);
    let mark = false;
    for(let i = 0; i < My_Graphs.length; i++){
        if(My_Graphs[i] === get_str){
            mark = true;
            My_Graphs.splice(i, 1);
            break;
        }
    }

    if(mark){
        window.alert(`Подграф построен правильно. Осталось построить подграфов:${My_Graphs.length}.`);
        mark_0_changing(mark_0+1);
    }
    else{
        window.alert(`Подграф построен не правильно или вы повторили его! Осталось построить подграфов:${My_Graphs.length}.`);
    }
}

function Vibor_Vertices_For_Check(graph:IGraph<IVertex, IEdge>, graph_check:IGraph<IVertex, IEdge>):string{ // Возвращает строку отсортированных степеней вершин плюс хвост из "-1" (для простоты сравнения) - это всё для ответа ученика
    let Nums_Verts:number[] = [];
    let i = 0;
    graph.vertices.forEach((v1:IVertex)=>{
        Nums_Verts[i]=0;
        graph.vertices.forEach((v2:IVertex)=>{
            if(v1.name!==v2.name && v1.isAdjacent(graph,v2)){
                Nums_Verts[i]++;

            }
        });
        i++;
    });
    Nums_Verts.sort(function(a:number,b:number){return b - a;});
    if(graph_check.vertices.length >= graph.vertices.length){
        for(let i = graph.vertices.length; i < graph_check.vertices.length; i++){
            Nums_Verts[i] =- 1;
        }
    }
    let result = '';
    for(let j = 0; j < Nums_Verts.length; j++){
        result += Nums_Verts[j];
    }
    return result;
}

export {CheckingAnswer, LastCheckingAnswer};