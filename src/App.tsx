import React, {FormEvent} from 'react';
import { Component } from 'react';

import {
    ToolButton,
    ToolButtonList,/* IGraphView, IMatrixView, INGraphsView, State, ToolButton*/
} from "graphlabs.core.template";
import { GraphVisualizer, Template, Toolbar, store, StudentMark, Console, graphActionCreators, adapter } from "graphlabs.core.template";
import {  /*Graph, SccBuilder, Vertex, Edge,*/
    IGraph,
    IVertex,
    IEdge,
    GraphGenerator,
    Vertex
} from "graphlabs.core.graphs";
import styles from './Template.module.scss';
import 'graphlabs.core.template/dist/main.css';
import {WritableAdapter} from "graphlabs.core.visualizer";

import './App.css';

import { /*Component,*/ SFC} from 'react';
import { init1, graphModel1, initres, /*graphModelres,*/ init, graphModel, graphModelres } from './ForMyGraphModel';
import {message_0, message_0_changing, num_0, num_0_changing, mark_0, mark_0_changing, T_s, T_s_changing, T_s_shawing, need_render, need_render_changing } from './ForMeVars';
import { CheckingAnswer, LastCheckingAnswer } from "./CheckAnswer";
import { GraphsInit } from "./GraphsInit"
import ReactDOM from "react-dom";
import {log} from "util";
import * as d3 from "d3";
import { MyVisualizer } from "./MyVisualizer";

/*
Мой личный баг: 1) убери рендеринг графа через GraphVisualizer из области задания 2) Профит, т.е. долбаные изначальные кнопки возвращаются. Скорее всего дело в том,
что рендеринг графа в области задания как-то влияет на моё переопределение функции, которая меняет область кнопок.
Поэтому я использую костыль: ренжерю пустой граф
 */

class App extends Template {

    public state = {
        status: store.getState().app.status,
    };

    componentWillMount() {
        mark_0_changing(0);
        message_0_changing("Постройте все не изоморфные связные и не связные подграфы данного графа. ");
        GraphsInit();

        let timerId = setInterval(()=>{
            T_s_changing(T_s-1);
            //if(need_render){ // Это супер плохой костыль. Всё из-за того, что при обновлении с помощью this.forceUpdate() в кнопке добавлении вершины мой граф
                // полностью пропадает, без поняти почему. т.е. все его элементы просто исчезают. В ту же секунду отрендерить его зано во пока не получилось.
                // Поэтому костыль заключается в том, что я считаю своё собственное время и каждую секунду смотрю, что мне нужно поменять. Знаю, componentDidMount
                // и ему подобные мне в помощь, но пока не знаю что из этого использовать или как это использовать.
            //
            // Исправил в ту же минуту, но инстинктивно. Не знаю насколько я правильно добавил его в componentDidUpdate(), поэтому, стоит потом разобраться по подробнее.

            //MyVisualizer(graphModel1,"graph-Model-1");
                //need_render_changing(false);
            //}
            ReactDOM.render(T_s_shawing(), document.getElementById("T_s"));
        }, 1000);
        window.setTimeout(()=>{clearInterval(timerId);LastCheckingAnswer();},1000*45*60);
    }

    componentDidMount() {
        let graph = GraphGenerator.generate(0);
        graph.addVertex(new Vertex('0'));
        graph.addVertex(new Vertex('1'));
        graph.addVertex(new Vertex('2'));
        graph.addVertex(new Vertex('3'));
        graph.addVertex(new Vertex('4'));
        MyVisualizer(graphModel1,"graph-Model-1");
        //this.render();
        //this.forceUpdate();
    }

    componentDidUpdate() {
        if(need_render) {
            MyVisualizer(graphModel1, "graph-Model-1");
            need_render_changing(false);
        }
    }

    protected getTaskToolbar() {
        Toolbar.prototype.getButtonList = () => {
            function beforeComplete(this: App):  Promise<{ success: boolean; fee: number }> {
                return new Promise((resolve => {
                    resolve(LastCheckingAnswer());
                }));
            }
            ToolButtonList.prototype.beforeComplete = beforeComplete.bind(this);
            ToolButtonList.prototype.help = () => `В данном задании вы должны построить результат операции, указанной в задании в правой части экрана. Для этого вы можете добавлять любое число вершин/рёбер. Также вы можете удалять любое число вершин, не инцидентных ни одному ребру или рёбер. Оценка зависит только от того, правильно ли вы построите граф.`;
            ToolButtonList.prototype.toolButtons = {};
            return ToolButtonList;
        };
        Toolbar.prototype.render = () => {
            const Buttons = Toolbar.prototype.getButtonList();
            return (
                <div style={{marginLeft:'4px'}}>
                    <p>Панель инструментов</p>
                    <Buttons/>
                    <button style={{marginTop:'4px', border: '1px double black', borderRadius:'10px', background: 'white', width:'130px', height:'46px', textAlign: 'center', font:'13pt serif'}} onClick={()=>{
                        const start = new Date().getTime();
                        //adapter.addVertex();
                        graphModel.addVertex(new Vertex(`${graphModel.vertices.length}`));
                        this.forceUpdate();
                        need_render_changing(true);
                        const end = new Date().getTime();
                        T_s_changing(T_s - Math.round((end-start)/1000));
                    }}>Добавить<br/>вершину</button>
                    <button style={{marginTop:'4px', border: '1px double black', borderRadius:'10px', background: 'white', width:'130px', height:'46px', textAlign: 'center', font:'13pt serif'}} onClick={()=>{
                        const start = new Date().getTime();
                        adapter.addEdge();
                        graphModel.edges.forEach((e:IEdge, i=0)=>{e.name = `${i++}`;});
                        const end = new Date().getTime();
                        T_s_changing(T_s - Math.round((end-start)/1000));
                    }}>Добавить<br/>ребро</button>
                    <button style={{marginTop:'17px', border: '1px double black', borderRadius:'10px', background: 'white', width:'130px', height:'46px', textAlign: 'center', font:'13pt serif'}} onClick={()=>{
                        const start = new Date().getTime();
                        adapter.removeVertex();
                        const end = new Date().getTime();
                        T_s_changing(T_s - Math.round((end-start)/1000));
                    }}>Удалить<br/>вершину</button>
                    <button style={{marginTop:'4px', border: '1px double black', borderRadius:'10px', background: 'white', width:'130px', height:'46px', textAlign: 'center', font:'13pt serif'}} onClick={()=>{
                        const start = new Date().getTime();
                        adapter.removeEdge();
                        const end = new Date().getTime();
                        T_s_changing(T_s - Math.round((end-start)/1000));
                    }}>Удалить<br/>ребро</button>
                    <button style={{marginTop:'17px', border: '1px double black', borderRadius:'10px', background: 'white', width:'130px', height:'64px', textAlign: 'center', font:'13pt serif'}} onClick={()=>{
                        const start = new Date().getTime();
                        if(window.confirm("Вы уверены, что хотите добавить подграф в результат?")){
                            CheckingAnswer();
                            let graph = GraphGenerator.generate(0);
                            init(graph);
                            this.forceUpdate();
                        }
                        need_render_changing(true);
                        const end = new Date().getTime();
                        T_s_changing(T_s - Math.round((end-start)/1000));
                    }}>Добавить подграф<br/>в результат</button>
                    <button style={{marginTop:'4px', border: '1px double black', borderRadius:'10px', background: 'white', width:'130px', height:'46px', textAlign: 'center', font:'13pt serif'}} onClick={()=>{
                        const start = new Date().getTime();

                        MyVisualizer(graphModel1,"graph-Model-1");

                        const end = new Date().getTime();
                        T_s_changing(T_s - Math.round((end-start)/1000));
                    }}>Кнопка<br/></button>
                    <T_s_shawing/>
                </div>);
        };
        return Toolbar;
    }

    protected disable(){
        let element = document.getElementsByTagName('button')[0];
        if (element != null) {
            element.setAttribute('disabled','disabled');
        }
    }

    protected getArea(): SFC<{}> {
        return () =>
            <div style={{marginLeft:'4px', marginTop:'4px'}}>
                <p className={"help_for_casuals"} data-title="Рабочая область. В ней вы можете строить граф, являющийся результатом операции из области задания. Чтобы выделить ребро или вершину, нужно нажать на соответствующий элемент (который при выделении окрашивается в зелёный или красный соответственно)." >
                    <img src={"http://gl-backend.svtz.ru:5000/odata/downloadImage(name='Help.png')"}></img>
                </p>
                <GraphVisualizer
                    graph={graphModel}
                    adapterType={'writable'}
                    namedEdges={false}
                    vertexNaming={false}
                    withoutDragging={false}
                    edgeNaming={false}
                    incidentEdges={false}
                />
                <div className={"list_of_sub_graps"}>
                    <svg className={"sdq1"}>
                    </svg>
                    <svg className={"sdq2"}>
                    </svg>
                    <svg className={"sdq3"}>
                    </svg>
                    <svg className={"sdq4"}>
                    </svg>
                    <svg className={"sdq5"}>
                    </svg>
                    <svg className={"sdq6"}>
                    </svg>
                    <svg className={"sdq7"}>
                    </svg>
                    <svg className={"sdq8"}>
                    </svg>
                    <svg className={"sdq9"}>
                    </svg>
                </div>
            </div>
        //return () =>
        //    <GraphVisualizer
        //        graph={graphModelres}
        //        adapterType={'readable'}
        //        namedEdges={false}
        //        vertexNaming={false}
        //        withoutDragging={false}
        //        edgeNaming={false}
        //        incidentEdges={false}
        //    />;
    }

    protected task(): SFC<{}> {
        return () =>
            <div style={{marginLeft:'5px'}}>
                <p className={"help_for_casuals"} data-title="Область задания. Здесь представлено задание, которое нужно выполнить." >
                    <img src={"http://gl-backend.svtz.ru:5000/odata/downloadImage(name='Help.png')"}></img>
                </p>
                {message_0}
                <svg className={"graph-Model-1"}>
                </svg>
                <GraphVisualizer
                    graph={graphModelres}
                    adapterType={'readable'}
                    namedEdges={false}
                    vertexNaming={false}
                    withoutDragging={true}
                    edgeNaming={false}
                    incidentEdges={false}
                />
            </div>;
    }
}

/*

 */

export default App;
