import React from 'react';
import { Switch, Route } from 'react-router-dom';
import List from './components/List';
import Form from './components/Form';

const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={List} />
            <Route exact path='/form' component={Form} />
        </Switch>
    )
}

export default Routes;