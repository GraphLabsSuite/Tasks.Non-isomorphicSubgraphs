import {init, init1, initres, graphModel1} from "./ForMyGraphModel";
import {Edge, Graph, GraphGenerator, IEdge, IGraph, IVertex, Vertex} from 'graphlabs.core.graphs';
import { My_Graphs_changing } from './ForMeVars';
import {graph} from "graphlabs.core.template";

let for_bool = true;

function GraphsInit(){
    let graph: IGraph<IVertex, IEdge>;

    graph = GraphGenerator.generate(0);
    init(graph);

    let graph1: IGraph<IVertex, IEdge>;
    graph1 = GetNewRandomGraph(6);
    init1(graph1);

    RightGraphsPush();
}

function GetNewRandomGraph (num:number){
    let graph: IGraph<IVertex, IEdge>;
    graph = GraphGenerator.generate(0);

    for(let i=0; i<num; i++){
        graph.addVertex(new Vertex(`${i}`));
    }

    let i_help = 8; // number of edges.

    graph.vertices.forEach((v1:IVertex)=>{
        graph.vertices.forEach((v2:IVertex)=>{
            if (v1.name!==v2.name && !v1.isAdjacent(graph,v2) && i_help > 0 && Math.random() > 0.5){
                let e: IEdge;
                e = new Edge(v1,v2,`${v1.name}${v2.name}`);
                graph.addEdge(e);
                i_help--;
            }
        });
    });

    graph.checkIsomorphism(graph);
    return graph;
}

function RightGraphsPush(){ // Функция создаеёт набор закодированных случаев неизоморфных подграфов.
    let Vertices = Vibor_Vertices(); // это полезный массив по сути двумерный массив, где номер очереного подмассива является именем вершины, а сам массив состоит из имен вершин, смежных с этой вершиной
    let result:string[];
    result = [];
    for(let i = graphModel1.vertices.length, k = 1; i > 1; i--, k++ ){ // я делаю так: для каждого набора числа вершин оставшихся в графе =>
        let Nums = Vibor_Nums(k, graphModel1.vertices.length);         // я задаю нбор наборов, какие вершины стоит удалить. например есть 5 вершин и k=1, тогда набор есть [[0],[1],[2],[3],[4]]. k=2, тогда набор есть [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]] (иначе говоря перебираю все варианты выбора без повторений)
        Nums.forEach((nums)=>{                                // для каждого такого набора я имитирую удаление соответствующих вершин так, что в итоге у меня есть наборы строк получившихся отсортированных степеней вершин. Например нужно убрать первую вершну, значит я её степень приравниваю "-1", а остальным вершинам, которые были смежны с первой, я присваиваю степень на одну ниже, чем были изначально.
            result[result.length] = Smart_Delete(Vertices, nums);      // делать всё вышеперечисленное не в чисто числовом виде не рекомендуется, т.к. создание глубоких копий графов сильно затормаживает модуль и даже с учётом оптимизаций модуль просто напросто не загрузится.
        });
    }
    result.sort();           // для удобства читабельности сортирую полученные строки отсортированных степеней вершин с учётом иммитации удаления некоторых вершин
    result = Delete_Clons(result); // убираю повторения
    //result.forEach((str:string)=>{window.alert(`${str}`)}); // -----------------------------------------------------
    My_Graphs_changing(result);
}

function Smart_Delete(vertices:number[][], nums:number[]):string{
    let res_nums:number[];
    res_nums=[];
    for(let i = 0; i < vertices.length; i++){ // самое начало, где 12311 (т.е. последовательность степеней)
        res_nums[i] = vertices[i].length;
    }
    nums.forEach((num:number)=>{
        res_nums[num] = -1;
        for(let j = 0; j < vertices.length; j++){
            //window.alert(`nums:${nums}; j:${j}; num:${num}; ${vertices[j]}`); // ---------------------------------------
            if(j!==num && vertices[j].includes(num)){
                res_nums[j]--;
            }
        }
    });
    for(let h = 0; h < res_nums.length; h++){
        if(res_nums[h] < 0){
            res_nums[h] = -1;
        }
    }
    //window.alert(`${res_nums}`);
    res_nums.sort(function(a:number,b:number){return b - a;});
    let res = '';
    res_nums.forEach((num:number)=>{
        res+=`${num}`;
    });
    return res; //на выходе отсортированый массив степеней вершин после удаления вершин в виде строки
}

function Delete_Clons(a:string[]) {
    let a1=[];
    for (var q=1, i=1; q<a.length; ++q) {
        if (a[q] !== a[q-1]) {
            a[i++] = a[q];
        }
    }

    for (let j = 0; j < i; j++)
        a1[j] = a[j];
    return a1;
}

function Vibor_Vertices():number[][]{
    let Nums_Verts:number[] = [];
    let Verts_:number[][] = [];
    let i = 0;
    graphModel1.vertices.forEach((v1:IVertex)=>{
        graphModel1.vertices.forEach((v2:IVertex)=>{
            if(v1.name!==v2.name && v1.isAdjacent(graphModel1,v2)){
                Nums_Verts[i] = parseInt(v2.name);
                i++;
            }
        });
        i = 0;
        let help_Vert = Nums_Verts.slice();
        Nums_Verts = [];
        Verts_.push(help_Vert);
    });
    //window.alert(`verts:${Verts_}`); // ------------------------------------------------------
    return Verts_;
}

function Vibor_Nums(k:number, n:number){
    let Nums: number[][];
    Nums=[[]];
    for(let i = 0; i < k; i++){ // здесь я создаю входные данные для упрощения создания последующего массива.
        Nums[0][i] = i;
    }
    for(let j = 0; j < ((factorial(n)/(factorial(k)*factorial(n-k))) - 1); j++ ) {
        let help_arr = Nums[j].slice();
        Nums[j + 1] = Plus_Odin(help_arr, k, n, 0);
    }
    return Nums;
}

function Plus_Odin (nums:number[], k:number, n:number, m:number):number[]{ // функция для специфичного прибавления ([0,1]->[0,2]) чтобы создать такое: [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]  для любых входных параметров (выбрать k элементов без повторений из n элементов)
    if(nums[k-1] < n-m-1){
        nums[k-1]++;
        if(m>0){
            for(let i = 1; i<=m; i++){
                nums[k-1+i] = nums[k-1+i-1]+1;

            }
        }
        return nums;
    }
    else{
        return Plus_Odin(nums, k-1, n, m+1);
    }
}

function factorial(num:number):number{
    if(num>0){
        return num * factorial(num-1);
    }
    else{
        return 1;
    }
}

/*function Minus_Graph(izn_graph:number[]){
    let res = [0];
    {
        return res;
    }
    for_bool = false;
}

function Making_Nums(max_vert_num:number){
    let Graphs_Nums = [[0]];
    let Help_Graphs = [[0]]; // здесь содержатся начальные 3333 444444 и т.п.
    for (let j = 1; j <= max_vert_num; j++){
        for (let k = 0; k <= j; k++){
            Help_Graphs[j].push(j);
        }
    }
    let help;
    for (let i = 1; i <= max_vert_num; i++){
        Graphs_Nums.push(Help_Graphs[i]);
        while(for_bool){
            help = Minus_Graph(Graphs_Nums[Graphs_Nums.length-1]);
            Graphs_Nums.push(help);
        }
        for_bool = true;
    }
    return Graphs_Nums;
}

function RightGraphsPush(){
    let g: IGraph<IVertex, IEdge>;
    g = GraphGenerator.generate(0);
    let g1: IGraph<IVertex, IEdge>;
    g1 = GraphGenerator.generate(0);
    let Graphs_Nums = Making_Nums(5);
    for(let i = 0; i < Graphs_Nums.length; i++ ){

        Graphs.push(g);
        g = g1;
    }
}*/

export {GraphsInit};