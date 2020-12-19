import { Component } from 'react'
import LocalStroageContainer from './../../Services/LocalStroageContainer';

class LogOut extends Component {
    componentDidMount() {
        LocalStroageContainer.loggingOut()
        window.location = "/";
    }
    render() {
        return null;
    }
}

export default LogOut




