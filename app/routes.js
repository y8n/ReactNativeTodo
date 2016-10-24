import React from 'react';
import {
    Navigator
} from 'react-native';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';
import CompletePage from './pages/CompletePage';


const ROUTES = {
    HomePage,
    EditPage,
    CompletePage
}
let Routes = {};
Routes.initialRoute = {
    name: 'HomePage'
};
Routes.configureScene = (route, routeStack) => {
    switch (route.name) {
        case 'EditPage':
            return Navigator.SceneConfigs.FloatFromBottom;
        case 'CompletePage':
            return Navigator.SceneConfigs.PushFromRight;
        default:
            return Navigator.SceneConfigs.PushFromLeft;
    }
}
Routes.renderScene = (route, navigator) => {
    let Scene = ROUTES[route.name];
    return <Scene {...route} navigator={navigator} />;
}
export default Routes;