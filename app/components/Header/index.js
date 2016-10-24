import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

class Header extends Component {
    constructor(props) {
        super(props);
        this._onPressBack = this._onPressBack.bind(this); 
        this._onPressAdd = this._onPressAdd.bind(this); 
    }
    // 回退
    _onPressBack(){
        this.props.navigator.pop();
    }
    // 查询
    _onPressAdd(){
        // 新增
        this.props.navigator.push({
            name: 'EditPage'
        });
    }
    showBackIcon(){
        if(this.props.back){
            return (
                <TouchableOpacity onPress={this._onPressBack}>
                    <Image style={[styles.icon,styles.back]} source={require('./images/back.png')} />
                </TouchableOpacity>
            );
        }
        return (
            <View style={[styles.icon,styles.back]}></View>
        );
    }
    showAddIcon(){
        if(this.props.add){
            return (
                <TouchableOpacity onPress={this._onPressAdd}>
                    <Image style={[styles.icon,styles.add]} source={require('./images/add.png')} />
                </TouchableOpacity>
            );
        }
        return (
            <View style={[styles.icon,styles.add]}></View>
        );
    }
    render(){
        return (
            <View style={styles.header}>
                {this.showBackIcon()}
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
                {this.showAddIcon()}
            </View>
        );
    }
}
Header.defaultProps = {
    back: false,
    add: true,
    title: 'React Native Todo App'
};
const styles = StyleSheet.create({
    header:{
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#4C8CDE',
        alignItems: 'center',
    },
    icon:{
        height: 20,
        width: 20
    },
    titleWrapper: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        color: '#ffffff',
        fontSize: 18
    },
    back:{
        marginLeft: 8
    },
    add:{
        marginRight: 8
    }
});

export default Header;