import { Switch, Route, Redirect } from "react-router-dom";
import AdminDasboard from "../admin-pages/AdminDashboard/AdminDashboard";
import AdminMain from "../admin-pages/AdminMain/AdminMain";
import AdminMessages from "../admin-pages/AdminMessages";
import AdminPanel from "../admin-pages/AdminPanel/AdminPanel";
import Header from "../components/Header";
import NotFound from "../pages/NotFound/NotFound";
import Establecimientos from "../admin-pages/Establecimientos/Establecimientos";

export default function AdminRouter() {
  return (
    <div className="user-container">
      <Header></Header>
      <div className="admin-container">
        <Switch>
          <Route exact path="/admin" component={AdminMain} />
          <Route path="/admin/panel" component={AdminPanel} />
          <Route path="/admin/mensajeria" component={AdminMessages} />
          <Route path="/admin/indicadores" component={AdminDasboard} />
          <Route path="/admin/establecimientos" component={Establecimientos} />
          <Route path="/admin/404" component={NotFound} />
          <Route path="/admin/*">
            <Redirect to="/admin/404" />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
