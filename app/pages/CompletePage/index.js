import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Header from '../../components/Header';
import TodoList from '../../components/TodoList';
import Tabs from '../../components/Tabs';
import Loading from '../../components/Loading';

import Actions from '../../actions';

class CompletePage extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        allTodos: [],
        isLoading: true
      };
      this._onItemChangedHandler = this._onItemChangedHandler.bind(this);
      this._onTabChangeHandler = this._onTabChangeHandler.bind(this);
    }
    componentDidMount(){
        this.fetchTodoList();
    }
    fetchTodoList(){
        return Actions.getDoneTodoList().then((resData) => {
            if(resData.status){
                this.setState({
                    allTodos: resData.data,
                    isLoading: false
                });
            }
            return resData.status
        },(err) => {
            console.error(err);
        });
    }
    _onTabChangeHandler(index){
        if(index === 0){
            this.props.navigator.resetTo({
                name: 'HomePage'
            });
        }
    }
    _onItemChangedHandler() {
        this.setState({
            allTodos: [],
            isLoading: true
        });
        this.fetchTodoList();
    }
    renderList(){
        if (this.state.isLoading) {
            return <Loading />;
        }
        return <TodoList 
                    {...this.props} 
                    isCompletedList={true}
                    editable={false} 
                    todos={this.state.allTodos} 
                    onItemChanged={this._onItemChangedHandler}
                ></TodoList>;
    }
    render(){
        return (
            <View style={styles.complete}>
                <Header {...this.props}/>
                {this.renderList()}
                <Tabs index={1} onTabChange={this._onTabChangeHandler}></Tabs>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    complete: {
        flex:1,
        flexDirection: 'column'
    }
});
export default CompletePage;