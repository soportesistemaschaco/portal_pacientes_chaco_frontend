import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from '../NotFound';
import HCHSI from './pages/HCHSI';
import HCSumar from './pages/HCSumar';

export default function HCDRouter() {
    return (
             <Switch>
                <Route path='/usuario/historia-clinica/hsi' component={HCHSI}/>
                <Route path='/usuario/historia-clinica/programa-sumar' component={HCSumar }/>
                <Route path='/usuario/historia-clinica/404' component={NotFound}/>   
                <Route path='/usuario/historia-clinica/*'><Redirect to='/404'/></Route> 
            </Switch>
    )
}
