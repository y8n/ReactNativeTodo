import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

class Tabs extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            index: this.props.index
        };
    }
    _onPressHandler(index){
        this.setState({
            index
        });
        this.props.onTabChange(index);
    }
    render(){
        return (
            <View style={styles.tabs}>
                <View style={styles.tabItem}>
                    <TouchableOpacity onPress={this._onPressHandler.bind(this,0)}>
                        <View style={styles.tabContent}>
                            <Image style={styles.tabIcon} source={this.state.index===0?require('./images/list-2.png'):require('./images/list-1.png')}/>
                            <Text style={[styles.tabLabel,{
                                color: this.state.index === 0?'#4C8CDE':'#ccc'
                            }]}>未完成</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.tabItem}>
                    <TouchableOpacity onPress={this._onPressHandler.bind(this,1)}>
                        <View style={styles.tabContent}>
                            <Image style={styles.tabIcon} source={this.state.index===1?require('./images/done-2.png'):require('./images/done-1.png')}/>
                            <Text style={[styles.tabLabel,{
                                color: this.state.index === 1?'#4C8CDE':'#ccc'
                            }]}>已完成</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
Tabs.propTypes = {
    onTabChange: React.PropTypes.func.isRequired,
    index: React.PropTypes.number.isRequired
};
Tabs.defaultProps = {
    index: 0
};
const styles = StyleSheet.create({
    tabs:{
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingTop: 5,
        paddingBottom: 5
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabContent: {
        alignItems: 'center'
    },
    tabIcon: {
        height: 20,
        width: 20
    },
    tabLabel: {
        fontSize: 12
    }
});

export default Tabs;