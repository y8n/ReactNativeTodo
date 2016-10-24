import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    RecyclerViewBackedScrollView
} from 'react-native';

import TodoItem from '../TodoItem';
import Utils from '../../utils'

let SECTIONS = ['Past','Today','Tomorrow','Later'];

class TodoList extends Component {
    ds = null;
    constructor(props) {
        super(props);
        
        if(this.props.isCompletedList){ // 完成列表和未完成列表不一样
            SECTIONS = ['Today','Past'];
        } else {
            SECTIONS = ['Past','Today','Tomorrow','Later'];
        }

        let ds = new ListView.DataSource({
            getRowData              : (dataBlob, sectionID, rowID) => {
                return dataBlob[sectionID][rowID];
            },
            rowHasChanged           : (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged : (s1, s2) => s1 !== s2
        });
        this.ds = ds;
        let data = this.formatTodoList(this.props.todos);
        let todoData = data.todoData;
        let sections = data.sections;
        let rowIDs = data.rowIDs;
        this.state = {
          dataSource: ds.cloneWithRowsAndSections(todoData,sections,rowIDs)
        };
        this._renderRow = this._renderRow.bind(this);
    }
    formatTodoList(todos){
        let todoData = {};
        let sections = [];
        let rowIDs = (()=>{
            let temp = [];
            SECTIONS.forEach(() => {
                temp.push([]);
            });
            return temp;
        })();
        todos.forEach((todo) => {
            for(let i=0;i<SECTIONS.length;i++){
                let section = SECTIONS[i];
                let time = todo.endTime;
                if(this.props.isCompletedList){ // 完成列表和未完成列表不一样
                    time = todo.completedTime;
                }
                if(Utils.DateHandler['is'+section] && Utils.DateHandler['is'+section](time)){
                    if(!todoData[section]){
                        todoData[section] = {};
                    }
                    let key = `${section}_${todo.id}`;
                    todoData[section][key] = todo;
                    rowIDs[i].push(key);
                    break;
                }
            }
        });
        SECTIONS.forEach((section) => {
            if(todoData[section]){
                sections.push(section);
            }
        });
        // TODO 排序

        rowIDs = rowIDs.filter((item) => item.length);
        return {
            todoData,
            sections,
            rowIDs
        };
    }
    sortTodos(todos){
        todos.filter(function(item){
            return !item.isCompleted;
        }).sort(function(item1,item2){
            if(item2.priority !== item1.priority){ 
                return item2.priority - item1.priority; // 高等级排前面
            }
            // 同等级的，结束时间近的排前面
            return item2.endTime - item1.endTime;
        }).concat(this.props.todos.filter(function(item){
            return item.isCompleted;
        }));
    }
    _renderSectionHeader(sectionData, sectionID){
        return (
            <View style={styles.section}>
                <Text>{sectionID}</Text>
            </View>
        );
    }
    _renderRow(rowData, sectionID, rowID) {
        return (
            <TodoItem 
                    navigator={this.props.navigator}
                    id={rowData.id}
                    title={rowData.title}
                    endTime={rowData.endTime}
                    completedTime={rowData.completedTime}
                    isCompleted={rowData.isCompleted}
                    priority={rowData.priority}
                    onItemChanged={this.props.onItemChanged} // 点击删除
                    editable={this.props.editable}
            ></TodoItem>
        );
    }
    render(){
        return (
            <View style={styles.todoList}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    enableEmptySections={true}
                    renderSectionHeader={this._renderSectionHeader}
                />
            </View>
        );
    }
}
TodoList.defaultProps = {
    todos:  [],
    isCompletedList: false
}

const styles = StyleSheet.create({
    todoList: {
        paddingLeft: 3,
        paddingRight: 3,
        flex: 1,
        flexDirection: 'column',
    },
    section: {
        marginLeft: 8
    }
});
export default TodoList;