import React,{Component} from 'react';
import {
    Navigator
} from 'react-native';
import Routes from './routes';

class App extends Component {
    render(){
        return (
            <Navigator
                initialRoute={Routes.initialRoute}
                renderScene={Routes.renderScene}
                configureScene={Routes.configureScene}
            />
        );
    }
}
export default App;