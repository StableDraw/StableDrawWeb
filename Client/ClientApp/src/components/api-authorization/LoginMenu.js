/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import { Helmet } from 'react-helmet';

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

    /*authenticatedView(userName, profilePath, logoutPath, logoutState)
    {
        return (<Fragment>
        <NavItem>
            <NavLink className="text-dark" tag = {Link} to = {profilePath}>{userName}</NavLink>
        </NavItem>
        <NavItem>
            <NavLink className="text-dark" replace tag = {Link} to={logoutPath} state={logoutState}>Logout</NavLink>
        </NavItem>
        </Fragment>);
    }*/

    authenticatedView(userName, profilePath, logoutPath, logoutState)
    {
        return (
            <div className = "subbody">
                <div className = "blackout" id = "full_blackout">
                    <img className = "loading" alt = "loading.webp" src = "loading.webp"></img>
                </div>
                <div id = "mySidepanel" className = "sidepanel">
                    <a className = "closebtn"  id = "size_panel_closebtn">
                        &times;
                    </a>
                    <div id = "mods_of_work" className = "mods_of_work">
                        <a href = "#" className = "work_mode_href" title = "Картина по текстовому описанию" style = {{ borderBottomStyle: "hidden" }}>
                            <img className = "work_mode_img_btn" alt = "text_to_image.png" src = "text_to_image.png"></img>
                        </a>
                        <a className = "work_mode_href" id = "selected_work_mode" title = "Картина из рисунка (выбрано)">
                            <img className = "work_mode_img_btn" alt = "image_to_image.png" src = "image_to_image.png"></img>
                        </a> 
                        <a href = "#" className = "work_mode_href" title = "Обработка изображений с комьютера" style = {{ borderTopStyle: "hidden" }}>
                            <img className = "work_mode_img_btn" alt = "photo_to_image.png" src = "photo_to_image.png"></img>
                        </a>
                        <a href = "#" className = "work_mode_href" title = "Создание анимации" style = {{ borderTopStyle: "hidden" }}>
                            <img className = "work_mode_img_btn" alt = "frames_to_animation.png" src = "frames_to_animation.png"></img>
                        </a>
                    </div>
                    <div className = "sidepanel_bottom_buttons">
                        <button className = "sidepanel_bottom_button" title = "Настройки">
                            <img className = "sidepanel_bottom_button_img" alt = "settings.png" src = "settings.png"></img>
                        </button>
                        <button className = "sidepanel_bottom_button" id = "change_theme" title = "Тёмная/светлая тема">
                            <img className = "sidepanel_bottom_button_img" id = "theme_mode_img" alt = "dark mode.png" src = "dark mode.png"></img>
                        </button>
                        <button className = "sidepanel_bottom_button" title = "Язык/language">
                            <img className = "sidepanel_bottom_button_img" alt = "language.png" src = "language.png"></img>
                        </button>
                    </div>
                    <div className = "helpfull_links" fontSize = "2px" style = {{ bottom: "15%" }}>
                        <NavLink className = "helpfull_link" title = "Профиль" style = {{ width: "95%" }} tag = {Link} to = {profilePath}>
                            {userName}
                        </NavLink>
                        <NavLink className = "authLink btn btnLink textDark" style = {{ width: "23%", marginRight: "auto", marginLeft: "auto" }} replace tag = {Link} to = {logoutPath} state = {logoutState}>
                            Выйти
                        </NavLink>
                    </div>
                    <div className = "helpfull_links" fontSize = "2px">
                        <div className = "helpfull_link">
                            <a href = "#">
                                О нас
                            </a>
                        </div>
                        <div className = "helpfull_link">
                            <a href = "#">
                                Помощь
                            </a>
                        </div>
                    </div>
                </div>
                <div className = "blackout" id = "side_panel_blackout" style = {{ zIndex: 20 }}></div>
                <button className = "openbtn">
                    &#9776;
                </button>
                <div className = "cursor">
                    <img className = "cursimg" alt = "cursimg" style = {{ width: "30px", height: "30px" }}></img>
                </div>
                <div className = "layers">
                    <div className = "layers_buttons">
                        <button className = "layers_mini_button" id = "merge_layers" title = "Объединить слои">
                            <img className = "layers_mini_button_image" alt = "merge.png" src = "merge.png"></img>
                        </button>
                        <button className = "layers_mini_button" id = "swap_layers" title = "Поменять слои местами">
                            <img className = "layers_mini_button_image" alt = "swap.png" src = "swap.png"></img>
                        </button>
                    </div>
                    <div className = "layer_box">
                        <div className = "layer" id = "layer_1">
                            <div className = "layer_button_box">
                                <button className = "layer_left_mini_button" id = "layer_1_visibility_button" title = "Включить/выключить видимость">
                                    <img className = "layer_left_mini_button_image" id = "layer_1_visibility_img" alt = "visibility_on.png" src = "visibility_on.png"></img>
                                </button>
                                <button className = "layer_left_mini_button" id = "clear_layer_1" title = "Очистить слой">
                                    <img className = "layer_left_mini_button_image" alt = "clear.png" src = "clear.png"></img>
                                </button>
                            </div>
                            <div className = "layer_button" id = "layer_button_1">
                                <div className = "layer_display_icon" id = "layer_display_icon_1">
                                    <canvas className = "layer_display_canvas" id = "layer_1_display_canvas" style = {{ zIndex: 1 }}></canvas>
                                    <div className = "layer_display_canvas" id = "layer_alpha_img_1" style = {{ zIndex: 0, backgroundImage: "url(mini_alpha_pattern.png)", backgroundRepeat: "repeat" }}></div>
                                </div>
                            </div>
                        </div>
                        <div className = "layer" id = "layer_2">
                            <div className = "layer_button_box">
                                <button className = "layer_left_mini_button" id = "layer_2_visibility_button" title = "Включить/выключить видимость">
                                    <img className = "layer_left_mini_button_image" id = "layer_2_visibility_img" alt = "visibility_on.png" src = "visibility_on.png"></img>
                                </button>
                                <button className = "layer_left_mini_button" id = "clear_layer_2" title = "Очистить слой">
                                    <img className = "layer_left_mini_button_image" alt = "clear.png" src = "clear.png"></img>
                                </button>
                            </div>
                            <div className = "layer_button" id = "layer_button_2">
                                <div className = "layer_display_icon" id = "layer_display_icon_2">
                                    <canvas className = "layer_display_canvas" id = "layer_2_display_canvas" style = {{ zIndex: 1 }}></canvas>
                                    <div className = "layer_display_canvas" id = "layer_alpha_img_2" style = {{ zIndex: 0, backgroundImage: "url(mini_alpha_pattern.png)", backgroundRepeat: "repeat" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "scale_field">
                    <input type = "text" className = "f_ratio" list = "default_ratio" name = "f_ratio" required placeholder = "W:H"/>
                    <datalist id = "default_ratio">
                        <option value = "16:9"></option>
                        <option value = "1:1"></option>
                        <option value = "21:9"></option>
                        <option value = "4:3"></option>
                        <option value = "9:16"></option>
                        <option value = "9:21"></option>
                    </datalist>
                </div>
                <div id = "before_gen_block" style = {{ position: "fixed", top: "50px", left: "5%", height: "20%", width: "20%", border: "2px solid #111111", zIndex: "15", display: "none" }}>
                    <div className = "closebtn" id = "close_before_gen_block" style =  {{ position: "absolute", zIndex: "16", right: "-2px", top: "-2px", width: "20px", height: "20px", cursor: "pointer", textAlign: "center", background: "#ffffff", border: "2px solid #111111" }}>
                        <a style = {{ position: "relative", top: "-40%", fontSize: "25px" }}>
                            &times;
                        </a>
                    </div>
                    <canvas id = "before_gen" style = {{ position: "relative", width: "100%", height: "100%", cursor: "pointer" }}></canvas>
                </div>
                <div className = "d_frame" id = "d_frame">
                    <div className = "v_frame" id = "v_frame">
                        <canvas className = "drawfield" id = "canvas_additional" style = {{ zIndex: 10 }}></canvas>
                        <canvas className = "drawfield" id = "canvas_foreground" style = {{ zIndex: 9 }}></canvas>
                        <canvas className = "drawfield" id = "canvas_background" style = {{ zIndex: 8 }}></canvas>
                        <div className = "drawfield" id = "alpha_img" style = {{ zIndex: 7, backgroundImage: "url(alpha_pattern.png)", backgroundRepeat: "repeat" }}></div>
                    </div>
                </div>
                <div className = "clr_window" id = "clr_window">
                    <form action = "">
                        <div className = "form-item">
                            <label id = "text_label_clr" htmlFor = "color">
                                Цвет:
                            </label>
                            <input type = "text" id = "color" name = "color" defaultValue = "#000000"></input>
                        </div>
                        <div id = "picker"></div>
                    </form>
                    <button className = "ctype_clr_btn" id = "ctype_clr_btn" type = "button">
                        Цвет фона
                    </button>
                    <button className = "ok_clr_btn" id = "ok_clr_btn" type = "button">
                        Сохранить
                    </button>
                </div>
                <div className = "up_add_window" id = "pencil_window" style = {{ marginRight: "14.5%", display: "block" }}>
                    <div className = "pencil_window_thickness_block">
                        <img className = "thicknessimg" alt = "thickness.png" src = "thickness.png"></img>
                        <input className = "up_add_window_slider" type = "range" id = "thickness_sliderValue" min = "1" max = "100" defaultValue = "1"></input>
                        <input className = "up_add_window_field" type = "number" id = "thickness_rangeValue" min = "1" max = "100" defaultValue = "1"></input>
                    </div>
                    <div className = "pencil_window_smoothing_block">
                        <img className = "smoothingimg" alt = "smoothing.png" src = "smoothing.png"></img>
                        <input className = "up_add_window_slider" type = "range" id = "smoothing_sliderValue" min = "0" max = "100" defaultValue = "0"></input>
                        <input className = "up_add_window_field" type = "number" id = "smoothing_rangeValue" min = "0" max = "100" defaultValue = "0"></input>
                    </div>
                </div>
                <div className = "up_add_window" id = "eraser_window" style = {{ marginRight: "7.5%", display: "none" }}>
                    <div className = "eraser_window_thickness_block">
                        <img className = "thicknessimg" alt = "thickness.png" src = "thickness.png"></img>
                        <input className = "up_add_window_slider" type = "range" id = "e_thickness_sliderValue" min = "1" max = "100" defaultValue = "1"></input>
                        <input className = "up_add_window_field" type = "number" id = "e_thickness_rangeValue" min = "1" max = "100" defaultValue = "1"></input>
                    </div>
                </div>
                <button className = "up_panel_button_tool" id = "graphic_tablet" title = "Учитывать силу нажатия" style = {{ display: "none", position: "fixed", top: "4px", left: "10%" }}>
                    <img className = "up_panel_button_image" id = "graphic_tablet_image" alt = "graphic_tablet.png" src = "graphic_tablet.png"></img>
                </button>
                <div className = "palette_nav"></div>
                <div className = "nav">
                    <div className = "icon_buttons">
                        <button className = "up_panel_button" id = "arrow_back" title = {"Отменить"}>
                            <img className = "up_panel_button_image" id = "arrow_back_image" alt = "undo_arrow.png" src = "undo_arrow.png"></img>
                        </button>
                        <button className = "up_panel_button" id = "arrow_next" title = "Повторить">
                            <img className = "up_panel_button_image" id = "arrow_next_image" alt = "repeat_arrow.png" src = "repeat_arrow.png"></img>
                        </button>
                        <button className = "up_panel_button" id = "palette" title = "Выбор цвета">
                            <img className = "up_panel_button_image" id = "clrimg" alt = "palette.png" src = "palette.png" style = {{ filter: "invert(1)" }} ></img>
                        </button>
                        <button className = "up_panel_button_tool" id = "pencil" title = "Карандаш">
                            <img className = "up_panel_button_image" id = "pencil_image" alt = "pencil.png" src = "pencil.png"></img>
                        </button>
                        <button className = "up_panel_button_tool" id = "eraser" title = "Ластик">
                            <img className = "up_panel_button_image" id = "eraser_image" alt = "eraser.png" src = "eraser.png"></img>
                        </button>
                        <button className = "up_panel_button_tool" id = "bucket" title = "Заливка">
                            <img className = "up_panel_button_image" id = "bucket_image" alt = "bucket.png" src = "bucket.png"></img>
                        </button>
                        <button className = "up_panel_button_tool" id = "pipette" title = "Пипетка">
                            <img className = "up_panel_button_image" id = "pipette_image" alt = "pipette.png" src = "pipette.png"></img>
                        </button>
                        <button className = "up_panel_button" id = "clear" title = "Очистить рабочую область">
                            <img className = "up_panel_button_image" id = "clearimg" alt = "clear.png" src = "clear.png"></img>
                        </button>
                        <button className = "up_panel_button" id = "upload" title = "Загрузить изображение на сайт">
                            <img className = "up_panel_button_image" id = "uploadimg" alt = "upload.png" src = "upload.png"></img>
                            <input className = "hiddenInput" type = "file" accept = "image/*,.png,.jpg,.gif,.web,.bmp" id = "my_hidden_file" name = "loadfile"></input>
                        </button>
                        <button className = "up_panel_button" id = "save" title = "Сохранить изображение">
                            <img className = "up_panel_button_image" id = "saveimg" alt = "save.png" src = "save.png"></img>
                        </button>
                        <button className = "up_panel_button" id = "generate" data-toggle = "modal" title = "ИИ обработка">
                            <img className = "up_panel_button_image" id = "generateimg" alt = "generate.png" src = "generate.png"></img>
                        </button>
                    </div>
                </div>
                <React.Fragment>
                    <Helmet>
                        <script src = 'main.js'></script>
                    </Helmet>
                </React.Fragment>
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