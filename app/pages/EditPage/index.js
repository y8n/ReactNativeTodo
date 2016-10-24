import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Picker,
    DatePickerAndroid,
    TimePickerAndroid,
    TouchableOpacity,
    Image,
    ToastAndroid
} from 'react-native';
import Header from '../../components/Header';

import Actions from '../../actions';
import Utils from '../../utils'

class EditPage extends Component {
    pageMode = 'add';

    constructor(props) {
        super(props);
    
        var data = this.props.data;
        if(data){
            this.pageMode = 'edit';
            this.state = {
                id: data.id,
                headerTitle: '详细信息',
                title: data.title, 
                priority: data.priority,
                endTime: data.endTime
            }
        }else{
            this.state = {
                headerTitle: '新增',
                title: '', 
                priority: 1,
                endTime: Date.now()
            }
        }
        this._showDatepickerHandler = this._showDatepickerHandler.bind(this);
        this._onConfirmHandler = this._onConfirmHandler.bind(this);
    }
    async openDateTimepicker(){
        let dt = new Date(this.state.endTime);
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: dt
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
                const {action, hour, minute} = await TimePickerAndroid.open({
                    hour: dt.getHours(),
                    minute: dt.getMinutes(),
                    is24Hour: false
                });
                if (action !== TimePickerAndroid.dismissedAction) {
                    // 这里开始可以处理用户选好的时分两个参数：hour (0-23), minute (0-59)
                    return {
                        year,
                        month,
                        day,
                        hour,
                        minute
                    }
                }
            }
            return false;
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }
    _onConfirmHandler(){
        let {id,title,endTime,priority} = this.state;
        if(!title){
            ToastAndroid.show('内容不能为空!',ToastAndroid.SHORT);
            return;
        }
        if(this.pageMode === 'add'){ // 添加
            Actions.addNewTodo({title,endTime,priority}).then((resData)=>{
                if(resData.status){
                    // 新增成功
                    this.props.navigator.resetTo({
                        name: 'HomePage'
                    });
                } else {
                    ToastAndroid.show(resData.message,ToastAndroid.SHORT)
                }
            });
        }else{
            Actions.editTodo({id,title,endTime,priority}).then((resData)=>{
                if(resData.status){
                    // 编辑成功
                    this.props.navigator.resetTo({
                        name: 'HomePage'
                    });
                } else {
                    ToastAndroid.show(resData.message,ToastAndroid.SHORT)
                }
            })
        }
    }
    _showDatepickerHandler(){
        this.openDateTimepicker().then((data) => {
            if(data){
                let dt = Utils.DateHandler.parseDate(data);
                this.setState({
                    endTime: dt.getTime()
                })
            }
        })
    }
    render(){
        return (
            <View style={styles.edit}>
                <Header {...this.props} back={true} add={false} title={this.state.headerTitle}/>
                <View style={styles.main}>
                    <Text>内容</Text>
                    <TextInput 
                        value={this.state.title}
                        onChangeText={(title)=>{
                            this.setState({title});
                        }}
                    ></TextInput>
                    <Text>优先级</Text>
                    <Picker
                        selectedValue={this.state.priority}
                        onValueChange={(priority) => this.setState({priority})}>
                        <Picker.Item label="普通(低)" value={1} />
                        <Picker.Item label="重要(中)" value={2} />
                        <Picker.Item label="紧急(高)" value={3} />
                    </Picker>
                    <Text>截止时间</Text>
                    <TouchableOpacity onPress={this._showDatepickerHandler}>
                        <View style={styles.endTime}>
                            <Text style={styles.endTimeText}>{Utils.DateHandler.formatDate(this.state.endTime)}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.buttonBox}>
                        <TouchableOpacity onPress={this._onConfirmHandler}>
                            <View style={[styles.button,styles.okBtn]}>
                                <Text style={styles.btnText}>确定</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigator.pop();
                        }}>
                            <View style={[styles.button,styles.cancelBtn]}>
                                <Text style={styles.btnText}>取消</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    edit: {
        flex:1,
        flexDirection: 'column'
    },
    main: {
        padding: 10
    },
    endTime: {
        borderBottomColor: '#aaa',
        borderBottomWidth: 1,
        padding: 10
    },
    endTimeText: {
        color: '#000'
    },
    buttonBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 50
    },
    button: {
        width: 100,
        height: 35,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: '#fff',
        fontSize: 18
    },
    okBtn: {
        backgroundColor: '#4C8CDE'
    },
    cancelBtn: {
        backgroundColor: '#999'
    }
});
export default EditPage;