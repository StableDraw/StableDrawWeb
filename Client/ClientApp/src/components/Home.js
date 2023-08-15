import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { Link, Route } from 'react-router-dom';
import authService from './api-authorization/AuthorizeService';
import { ApplicationPaths } from './api-authorization/ApiAuthorizationConstants';
export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        }
        else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = `${ApplicationPaths.LogOut}`;
            const logoutState = {
                local: true
            };
            return this.authenticatedView(userName, profilePath, logoutPath, logoutState);
        }
    }

    authenticatedView(userName, profilePath, logoutPath, logoutState) {
        return (
            <div className="start-page" data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
                <div>
                    <header className="site-navbar site-navbar-target">
                        <div className="nav-up-left-block">
                            <a href="/" className="bootstrap-nav-link">
                                Главная
                            </a>
                        </div>
                        <div className="nav-up-right-block">
                            <NavLink tag={Link} to={profilePath} className="nav-up-user-link">
                                {userName}
                            </NavLink>
                            <NavLink tag={Link} to={logoutPath} state={logoutState} className="nav-up-auth-link">
                                Выйти
                            </NavLink>
                        </div>
                    </header>
                    <div className="bootstrap-ftco-blocks-cover-1">
                        <div className="ftco-cover-1" style={{ backgroundImage: "url('mian.gif')" }} >
                            <div className="bootstrap-container">
                                <div className="row align-items-center justify-content-center" style={{ zIndex: "10000" }}>
                                    <div className="col-lg-7 text-center">
                                        <h1 className="dark-light" style={{ color: "#cccccc" }}>
                                            StableDraw
                                        </h1>
                                        <p className="font-size-24" style={{ color: "#cccccc" }} >
                                            Веб-платформа для рисования, обработки изображений и создания анимаций с применением искусственных нейронных сетей
                                        </p>
                                        <div className="block-start-button">
                                            <NavLink tag={Link} to="/drawing-to-img" className="bootstrap-btn primary-outline-blue--hover">
                                                <button className="start-button-text">
                                                    <span className='glowing-txt'>Н<span
                                                        className='faulty-letter'>А</span>ЧАТЬ</span>
                                                </button>
                                            </NavLink>
                                            <NavLink tag={Link} to="/notdrawing-to-img" className="bootstrap-btn primary-outline-blue--hover">
                                                <button className="start-button-text1">
                                                    <span className='glowing-txt'>ТЕС<span
                                                        className='faulty-letter'>ТИ</span>РОВАТЬ</span>
                                                </button>
                                            </NavLink>
                                            <NavLink tag={Link} to="/babylon" className="bootstrap-btn primary-outline-blue--hover">
                                                <button className="start-button-text2">
                                                    <span className='glowing-txt'>BAB<span
                                                        className='faulty-letter'>YL</span>ON</span>
                                                </button>
                                            </NavLink>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ftco-cover-1-overlay"></div>
                    </div>
                </div>
                <footer style={{ position: "fixed", width: "100%", height: "8%", bottom: "0", left: "0", zIndex: "9999", backgroundColor: "rgba(10, 10, 10, 0.8)" }} >
                    <div className="line_looter" style={{ width: "75%", borderTop: "solid 1px #489", margin: "0 auto", textAlign: "center" }} >
                        <div className="links" style={{ margin: "3px auto", textAlign: "center" }}>
                            <a href="https://vk.com/stabledraw">
                                <img className="img-link" alt="vk.png" src="vk.png" width="50" height="50"></img>
                            </a>
                            <a href="https://vk.com/app6613443#snippet_id=2&owner_id=402965562&project_id=296524">
                                <img className="img-link" alt="money.png" src="money.png" width="50" height="50"></img>
                            </a>
                            <a href="Pay">
                                <img className="img-link" alt="money.png" src="money.png" width="50" height="50"></img>
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }

    anonymousView(registerPath, loginPath) {
        return (
            <div className="start-page" data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
                <div>
                    <header className="site-navbar site-navbar-target">
                        <div className="nav-up-left-block">
                            <a href="/" className="bootstrap-nav-link">
                                Главная
                            </a>
                        </div>
                        <div className="nav-up-right-block">
                            <NavLink tag={Link} to={registerPath} className="nav-up-reg-link">
                                Регистрация
                            </NavLink>
                            <NavLink tag={Link} to={loginPath} className="nav-up-auth-link">
                                Вход
                            </NavLink>
                        </div>
                    </header>
                    <div className="bootstrap-ftco-blocks-cover-1">
                        <div className="ftco-cover-1" style={{ backgroundImage: "url('mian.gif')" }} >
                            <div className="bootstrap-container">
                                <div className="row align-items-center justify-content-center" style={{ zIndex: "10000" }}>
                                    <div className="col-lg-7 text-center">
                                        <h1 className="dark-light" style={{ color: "#cccccc" }}>
                                            StableDraw
                                        </h1>
                                        <p className="font-size-24" style={{ color: "#cccccc" }} >
                                            Веб-платформа для рисования, обработки изображений и создания анимаций с применением искусственных нейронных сетей
                                        </p>
                                        <div className="block-start-button">
                                            <NavLink tag={Link} to="/drawing-to-img" className="bootstrap-btn primary-outline-blue--hover">
                                                <button className="start-button-text">
                                                    <span className='glowing-txt'>Н<span
                                                        className='faulty-letter'>А</span>ЧАТЬ</span>
                                                </button>
                                            </NavLink>
                                            <NavLink tag={Link} to="/notdrawing-to-img" className="bootstrap-btn primary-outline-blue--hover">
                                                <button className="start-button-text1">
                                                    <span className='glowing-txt'>ТЕС<span
                                                        className='faulty-letter'>ТИ</span>РОВАТЬ</span>
                                                </button>
                                            </NavLink>
                                            <NavLink tag={Link} to="/babylon" className="bootstrap-btn primary-outline-blue--hover">
                                                <button className="start-button-text2">
                                                    <span className='glowing-txt'>BAB<span
                                                        className='faulty-letter'>YL</span>ON</span>
                                                </button>
                                            </NavLink>
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ftco-cover-1-overlay"></div>
                    </div>
                </div>
                <footer style={{ position: "fixed", width: "100%", height: "8%", bottom: "0", left: "0", zIndex: "9999", backgroundColor: "rgba(10, 10, 10, 0.8)" }} >
                    <div className="line_looter" style={{ width: "75%", borderTop: "solid 1px #489", margin: "0 auto", textAlign: "center" }} >
                        <div className="links" style={{ margin: "3px auto", textAlign: "center" }}>
                            <a href="https://vk.com/stabledraw">
                                <img className="img-link" alt="vk.png" src="vk.png" width="50" height="50"></img>
                            </a>
                            <a href="https://vk.com/app6613443#snippet_id=2&owner_id=402965562&project_id=296524">
                                <img className="img-link" alt="money.png" src="money.png" width="50" height="50"></img>
                            </a>
                            <a href="Pay">
                                <img className="img-link" alt="money.png" src="money.png" width="50" height="50"></img>
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}