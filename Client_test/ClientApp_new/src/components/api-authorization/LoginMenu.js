/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';

export class LoginMenu extends Component
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            isAuthenticated: false,
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
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
        isAuthenticated,
        userName: user && user.name
        });
    }

    render()
    {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated)
        {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        }
        else
        {
        const profilePath = `${ApplicationPaths.Profile}`;
        const logoutPath = `${ApplicationPaths.LogOut}`;
        const logoutState = { local: true };
        return this.authenticatedView(userName, profilePath, logoutPath, logoutState);
        }
    }

    authenticatedView(userName, profilePath, logoutPath, logoutState)
    {
        return (
            <div className="start-page" data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
                <div>
                    <header className="site-navbar site-navbar-target">
                        <div className="row align-items-center position-relative">
                            <div className="col-lg-2">
                                <ul>
                                    <a href="https://stabledraw.com" className="bootstrap-nav-link">
                                        Главная
                                    </a>
                                </ul>
                            </div>
                            <div className="col-lg-7 text-center">
                                <div className="ml-auto toggle-button d-inline-block d-lg-none">
                                    <a href="#" className="site-menu-toggle py-5 js-menu-toggle text-white">
                                        <span className="icon-menu h3 text-white"></span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg">
                                <nav className="site-navigation text-left mr-auto">
                                    <ul className="site-menu main-menu js-clone-nav ml-auto d-lg-block">
                                        <li>
                                            <NavLink tag={Link} to={profilePath} className="bootstrap-nav-link" style={{ color: "#ffffff" }}>
                                                { userName }
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink tag={Link} to={logoutState} className="bootstrap-nav-link" style={{ color: "#ffffff" }}>
                                                Выйти
                                            </NavLink>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </header>
                    <div className="ftco-blocks-cover-1">
                        <div className="ftco-cover-1" style={{ backgroundImage: "url('mian.gif')" }} >
                            <div className="bootstrap-container">
                                <div className="row align-items-center justify-content-center" style={{ zIndex: "10000" }}>
                                    <div className="col-lg-7 text-center">
                                        <h1 dataAos="fade-up" dataAosDelay="0" className="dark-light" style={{ color: "#cccccc" }}>
                                            StableDraw
                                        </h1>
                                        <p dataAos="fade-up" dataAosDelay="100" className="font-size-24" style={{ color: "#cccccc" }} >
                                            веб-платформа для рисования, обработки изображений и создания анимаций с применением искусственных нейронных сетей
                                        </p>
                                        <p dataAos="fade-up" dataAosDelay="200">
                                            <NavLink tag={Link} to= "/drawing-to-img" className="bootstrap-btn primary-outline-white--hover">
                                                <a style={{ margin: "0 auto", textAlign: "center" }}>
                                                    Начать
                                                </a>
                                            </NavLink>
                                        </p>
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
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
    anonymousView(registerPath, loginPath)
    {
        return (
            <div className = "start-page" data-spy = "scroll" data-target = ".site-navbar-target" data-offset = "300">
                <div>
                    <header className = "site-navbar site-navbar-target">
                        <div className ="row align-items-center position-relative">
                            <div className = "col-lg-2">
                                <ul>
                                    <a href = "https://stabledraw.com" className = "bootstrap-nav-link">
                                        Главная
                                    </a>
                                </ul>
                            </div>
                            <div className = "col-lg-7 text-center">
                                <div className = "ml-auto toggle-button d-inline-block d-lg-none">
                                    <a href = "#" className = "site-menu-toggle py-5 js-menu-toggle text-white">
                                        <span className = "icon-menu h3 text-white"></span>
                                    </a>
                                </div>
                            </div>
                            <div className = "col-lg">
                                <nav className = "site-navigation text-left mr-auto">
                                    <ul className = "site-menu main-menu js-clone-nav ml-auto d-lg-block">
                                        <li>
                                            <NavLink tag = {Link} to = {registerPath} className = "bootstrap-nav-link" style = {{color: "#ffffff"}}>
                                                Регистрация
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink tag = {Link} to = {loginPath} className = "bootstrap-nav-link" style = {{color: "#ffffff"}}>
                                                Вход
                                            </NavLink>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </header>
                    <div className = "ftco-blocks-cover-1">
                        <div className = "ftco-cover-1" style = {{ backgroundImage: "url('mian.gif')" }} >
                            <div className = "bootstrap-container">
                                <div className = "row align-items-center justify-content-center" style = {{zIndex: "10000"}}>
                                    <div className = "col-lg-7 text-center">
                                        <h1 dataAos="fade-up" dataAosDelay="0" className = "dark-light" style = {{ color: "#cccccc" }}>
                                            StableDraw
                                        </h1>
                                        <p dataAos = "fade-up" dataAosDelay = "100" className = "font-size-24" style = {{ color: "#cccccc" }} >
                                            веб-платформа для рисования, обработки изображений и создания анимаций с применением искусственных нейронных сетей
                                        </p>
                                        <p dataAos = "fade-up" dataAosDelay = "200">
                                            <NavLink tag = {Link} to = {loginPath} className = "bootstrap-btn primary-outline-white--hover">
                                                <a style = {{ margin: "0 auto", textAlign: "center" }}>
                                                    Начать
                                                </a>
                                            </NavLink>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = "ftco-cover-1-overlay"></div>
                    </div>
                </div>
                <footer style = {{ position: "fixed", width: "100%", height: "8%", bottom: "0", left: "0", zIndex: "9999", backgroundColor: "rgba(10, 10, 10, 0.8)" }} >
                    <div className = "line_looter" style = {{ width: "75%", borderTop: "solid 1px #489", margin: "0 auto", textAlign: "center" }} >
                        <div className = "links" style = {{ margin: "3px auto", textAlign: "center" }}>
                            <a href = "https://vk.com/stabledraw">
                                <img className = "img-link" alt = "vk.png" src = "vk.png" width = "50" height = "50"></img>
                            </a>
                            <a href = "https://vk.com/app6613443#snippet_id=2&owner_id=402965562&project_id=296524">
                                <img className = "img-link" alt = "money.png" src = "money.png" width = "50" height = "50"></img>
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}