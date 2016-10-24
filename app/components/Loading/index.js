import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native';

class Loading extends Component {
    render(){
        return (
            <View style={styles.loading}>
                <ActivityIndicator
                    animating={true}
                    style={styles.activityIndicator}
                    size="large"
                    color="#4C8CDE"
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    loading:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIndicator: {
        height: 50
    }
});

export default Loading;