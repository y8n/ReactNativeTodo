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

class HomePage extends Component {
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
        return Actions.getUndoneTodoList().then((resData) => {
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
        if(index === 1){
            this.props.navigator.resetTo({
                name: 'CompletePage'
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
        return <TodoList todos={this.state.allTodos} {...this.props} onItemChanged={this._onItemChangedHandler}></TodoList>;
    }
    render(){
        return  (
            <View style={styles.home}>
                <Header {...this.props}/>
                {this.renderList()}
                <Tabs index={0} onTabChange={this._onTabChangeHandler}></Tabs>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    home: {
        flex:1,
        flexDirection: 'column'
    }
});
export default HomePage;