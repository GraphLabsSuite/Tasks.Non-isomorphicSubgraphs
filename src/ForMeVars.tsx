import React from 'react';
import {IEdge, IGraph, IVertex} from "graphlabs.core.graphs";
import {graphModel1} from "./ForMyGraphModel";

var My_Graphs:string[] = [];
let message_0 = '';
let num_0 = 0;
let mark_0 = 0; // оценка
let mark_1 = 0; // число неправильно найденных подграфов
let T_s = 45*60;
let need_render = false;

function My_Graphs_changing (new_My_Graphs: string[]) {My_Graphs = new_My_Graphs;}
function message_0_changing (new_message: string) {message_0 = new_message;}
function num_0_changing (new_num: number) {num_0 = new_num;}
function mark_0_changing (new_mark: number) {mark_0 = new_mark;}
function mark_1_changing (new_mark: number) {mark_1 = new_mark;}
function need_render_changing (new_need_render: boolean) {need_render = new_need_render;}
function T_s_changing (new_T_s: number) {T_s = new_T_s;}
function T_s_shawing () {
    let T_min, T_sec;
    T_sec = T_s%60;
    T_min = (T_s - T_sec)/60;
    if(T_min>=45){
        return (<p style={{border: '1px double black', borderRadius:'0px', background: 'white', width:'130px', height:'60px', textAlign: 'center', font:'13pt serif', position:'inherit', marginTop:'4px'}} id={"T_s"}> Осталось времени:<br/>{`${T_min}min ${T_sec}sec`} </p>);
    }
    else if(T_sec%2===0){
        return (<p style={{border: '1px double black', borderRadius:'0px', background: 'white', width:'130px', height:'60px', textAlign: 'center', font:'13pt serif', position:'inherit'}} id={"T_s"}> Осталось времени:<br/>{`${T_min}min ${T_sec}sec`} </p>);
    }
    else{
        return (<p style={{border: '1px double black', borderRadius:'0px', background: 'ffc069', width:'130px', height:'60px', textAlign: 'center', font:'13pt serif', position:'inherit'}} id={"T_s"}> Осталось времени:<br/>{`${T_min}min ${T_sec}sec`} </p>);
    }
}

export { num_0, message_0, num_0_changing, message_0_changing, mark_0, mark_0_changing, T_s, T_s_changing, T_s_shawing, My_Graphs, My_Graphs_changing, mark_1, mark_1_changing, need_render_changing, need_render };