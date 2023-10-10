import './App1.css';
import authService from '../api-authorization/AuthorizeService'
import { Link } from 'react-router-dom';
import { ApplicationPaths } from '../api-authorization/ApiAuthorizationConstants';
import React, {Component} from "react";
import "./styles.css";
import DrawPane from "./DrawPane";
import { Helmet } from 'react-helmet';
import { NavLink } from 'reactstrap';
export class App1 extends Component {
    constructor(props)
    {
        super(props);
        this.state =
            {
                userName: null
            };
    }

    componentDidMount()
    {

        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount()
    {
        authService.unsubscribe(this._subscription);
    }

    async populateState()
    {
        const [user] = await Promise.all([authService.getUser()])
        this.setState({
            userName: user && user.name
        });
    }

    render()
    {
        
        const { userName } = this.state;
        const profilePath = `${ApplicationPaths.Profile}`;
        const logoutPath = `${ApplicationPaths.LogOut}`;
        const logoutState = { local: true };
        if (this.state.loading)
        {
            return (
                <p><em>Loading...</em></p>
            )
        }
        else
        {
            return (
                App1.authenticatedView(userName, profilePath, logoutPath, logoutState)
            )
        }
    }
    static authenticatedView(userName, profilePath, logoutPath, logoutState) {
        return (

            <div className="App11" id="section">
                <div className = "blackout" id = "full_blackout">
                    <img className = "loading" alt = "loading.webp" src = "loading.webp"></img>
                </div>
                <div className="helpfull_links" fontSize="2px" style={{ bottom: "8%" }}>
                    <NavLink className="helpfull_link" title="Профиль" style={{ width: "100%" }} tag={Link} to={profilePath}>
                        {userName}
                    </NavLink>
                    <NavLink className="helpfull_link" style={{ width: "30%", marginRight: "auto", marginLeft: "auto" }} replace tag={Link} to={logoutPath} state={logoutState}>
                        Выйти
                    </NavLink>
                </div>

                <h1>STABLEDRAW EDITOR</h1>
                <DrawPane width={1800} height={750}/>
                <h2>MADE BY FAST™️</h2>
                <h3>SUPPORT US<span>❤️</span></h3>
                <footer style={{
                    position: "static",
                    width: "100%",
                    height: "8%",
                    bottom: "0",
                    left: "0",
                    zIndex: "9999",
                    backgroundColor: "rgba(10, 10, 10, 0.8)"
                }}>
                    <div className="line_looter"
                         style={{width: "75%", borderTop: "solid 1px #489", margin: "0 auto", textAlign: "center"}}>

                        <a href="https://vk.com/stabledraw">
                            <img className="img-link" alt="vk.jpg" src="vk.jpg" width="50" height="50"></img>
                        </a>
                        <a href="https://www.youtube.com/@Robolightning">
                            <img className="img-link" alt="tube.jpg" src="tube.jpg" width="50" height="50"></img>
                        </a>
                        <a href="https://vk.com/app6613443#snippet_id=2&owner_id=402965562&project_id=296524">
                            <img className="img-link" alt="money.png" src="money.png" width="50" height="50"></img>
                        </a>
                    </div>

                </footer>

            </div>

        );
    }

}


