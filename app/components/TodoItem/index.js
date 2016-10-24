import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    ToastAndroid
} from 'react-native';

import Actions from '../../actions';

class TodoItem extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            numberOfLines: 1,
            isCompleted: this.props.isCompleted,
            modalVisible: false
        };
        this._onPressTitle = this._onPressTitle.bind(this);
        this._toggleTodoItemHandler = this._toggleTodoItemHandler.bind(this);
        this._onLongPressHandler = this._onLongPressHandler.bind(this);
        this._onEditItemHandler = this._onEditItemHandler.bind(this);
        this._onRemoveItemHandler = this._onRemoveItemHandler.bind(this);
    }
    _onPressTitle(){
        this.setState({
            numberOfLines: this.state.numberOfLines === 1?Infinity:1
        });
    }
    _toggleTodoItemHandler(){
        if(this.state.isCompleted){
            Actions.reopenTodoItem(this.props.id).then(this._handlerResponse.bind(this));
        }else{
            Actions.completeTodoItem(this.props.id).then(this._handlerResponse.bind(this));
        }
    }
    _handlerResponse(resData){
        if(resData.status){
            this.setState({
                isCompleted: !this.state.isCompleted
            });
            setTimeout(() => {
                this.props.onItemChanged();
            },10)
        }
    }
    getImage(){
        let priority = this.props.priority;
        if(priority === 3){
            return this.state.isCompleted?require('./images/done-3.png'):require('./images/undone-3.png');
        }
        if(priority === 2){
            return this.state.isCompleted?require('./images/done-2.png'):require('./images/undone-2.png');
        }
        return this.state.isCompleted?require('./images/done-1.png'):require('./images/undone-1.png');
    }
    _onLongPressHandler(){
        this.setState({
            modalVisible: true
        });
    }
    _onEditItemHandler(){
        let {id, title, endTime, priority} = this.props;
        this.setState({
            modalVisible: false
        });
        this.props.navigator.push({
            name: 'EditPage',
            data: {id, title, endTime, priority}
        })
    }
    _onRemoveItemHandler(){
        Actions.removeTodo(this.props.id).then((resData) => {
            if(resData.status){
                this.setState({
                    modalVisible: false
                });
                this.props.onItemChanged();
                ToastAndroid.show('删除成功',ToastAndroid.SHORT);
            }else{
                ToastAndroid.show(resData.message || '删除失败',ToastAndroid.SHORT);
            }
        })
    }
    renderEditButton(){
        if(this.props.editable){
            return (<TouchableWithoutFeedback onPress={this._onEditItemHandler}>
                        <View style={[styles.modalItem,{
                            borderBottomWidth: 1,
                            borderBottomColor: '#ddd',
                        }]}>
                            <Text>编辑</Text>
                        </View>
                    </TouchableWithoutFeedback>)
        }
    }
    render() {
        return (
            <TouchableWithoutFeedback onLongPress={this._onLongPressHandler}>
                <View style={styles.todoItem}>
                    <TouchableOpacity onPress={this._toggleTodoItemHandler}>
                        <Image style={styles.icon} source={this.getImage()} />
                    </TouchableOpacity>
                    <View style={styles.content}>
                        <Text style={styles.title} 
                        numberOfLines={this.state.numberOfLines} 
                        onPress={this._onPressTitle}
                        onLongPress={this._onLongPressHandler}
                        >{this.props.title}</Text>
                        <Text style={styles.time}>{new Date(this.props.endTime).toLocaleDateString() + ' '+ new Date(this.props.endTime).toLocaleTimeString()}</Text>
                    </View>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {this.setState({
                            modalVisible: false
                        })}}
                    >
                        <TouchableWithoutFeedback 
                            onPress={()=>{this.setState({
                                modalVisible: false
                            })}}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    {this.renderEditButton()}
                                    <TouchableWithoutFeedback onPress={this._onRemoveItemHandler}>
                                        <View style={styles.modalItem}>
                                            <Text>删除</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    todoItem: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    content: {
        flex:1
    },
    icon: {
        height: 20,
        width: 20,
        marginLeft: 8,
        marginRight: 8
    },
    title: {
        color: '#444545',
        fontSize: 18
    },
    time: {
        color: '#BFBFC1',
        fontSize: 12
    },
    modalContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        borderRadius: 3,
        backgroundColor: '#fff',
        padding: 8,
        width: 150
    },
    modalItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30
    }
});
TodoItem.propTypes = {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    endTime: React.PropTypes.number,
    completedTime: React.PropTypes.number,
    isCompleted: React.PropTypes.bool.isRequired,
    priority: React.PropTypes.oneOf([1, 2, 3]),
    editable: React.PropTypes.bool
};
TodoItem.defaultProps = {
    priority: 1,
    editable: true
};

export default TodoItem;