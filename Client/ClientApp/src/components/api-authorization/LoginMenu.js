import React, { Component, Fragment } from 'react';
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
                    <img className = "loading" src = "loading.webp"></img>
                </div>
                <div id = "mySidepanel" className = "sidepanel">
                    <a className = "closebtn"  id = "size_panel_closebtn">
                        &times;
                    </a>
                    <div id = "mods_of_work" className = "mods_of_work">
                        <a href = "#" className = "work_mode_href" title = "Картина по текстовому описанию" style = {{ borderBottomStyle: "hidden" }}>
                            <img className = "work_mode_img_btn" src = "text_to_image.png"></img>
                        </a>
                        <a className = "work_mode_href" id = "selected_work_mode" title = "Картина из рисунка (выбрано)">
                            <img className = "work_mode_img_btn" src = "image_to_image.png"></img>
                        </a> 
                        <a href = "#" className = "work_mode_href" title = "Обработка изображений с комьютера" style = {{ borderTopStyle: "hidden" }}>
                            <img className = "work_mode_img_btn" src = "photo_to_image.png"></img>
                        </a>
                        <a href = "#" className = "work_mode_href" title = "Создание аримации" style = {{ borderTopStyle: "hidden" }}>
                            <img className = "work_mode_img_btn" src = "frames_to_animation.png"></img>
                        </a>
                    </div>
                    <div className = "sidepanel_bottom_buttons">
                        <button className = "sidepanel_bottom_button" title = "Настройки">
                            <img className = "sidepanel_bottom_button_img" src = "settings.png"></img>
                        </button>
                        <button className = "sidepanel_bottom_button" id = "change_theme" title = "Тёмная/светлая тема">
                            <img className = "sidepanel_bottom_button_img" id = "theme_mode_img" src = "dark mode.png"></img>
                        </button>
                        <button className = "sidepanel_bottom_button" title = "Язык/language">
                            <img className = "sidepanel_bottom_button_img" src = "language.png"></img>
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
                    <img className = "cursimg" style = {{ width: "30px", height: "30px" }}></img>
                </div>
                <div className = "layers">
                    <div className = "layers_buttons">
                        <button className = "layers_mini_button" id = "merge_layers" title = "Объединить слои">
                            <img className = "layers_mini_button_image" src = "merge.png"></img>
                        </button>
                        <button className = "layers_mini_button" id = "swap_layers" title = "Поменять слои местами">
                            <img className = "layers_mini_button_image" src = "swap.png"></img>
                        </button>
                    </div>
                    <div className = "layer_box">
                        <div className = "layer" id = "layer_1">
                            <div className = "layer_button_box">
                                <button className = "layer_left_mini_button" id = "layer_1_visibility_button" title = "Включить/выключить видимость">
                                    <img className = "layer_left_mini_button_image" id = "layer_1_visibility_img" src = "visibility_on.png"></img>
                                </button>
                                <button className = "layer_left_mini_button" id = "clear_layer_1" title = "Очистить слой">
                                    <img className = "layer_left_mini_button_image" src = "/clear.png"></img>
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
                                    <img className = "layer_left_mini_button_image" id = "layer_2_visibility_img" src = "visibility_on.png"></img>
                                </button>
                                <button className = "layer_left_mini_button" id = "clear_layer_2" title = "Очистить слой">
                                    <img className = "layer_left_mini_button_image" src = "/clear.png"></img>
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
                        <img className = "thicknessimg" src = "thickness.png"></img>
                        <input className = "up_add_window_slider" type = "range" id = "thickness_sliderValue" min = "1" max = "100" defaultValue = "1"></input>
                        <input className = "up_add_window_field" type = "number" id = "thickness_rangeValue" min = "1" max = "100" defaultValue = "1"></input>
                    </div>
                    <div className = "pencil_window_smoothing_block">
                        <img className = "smoothingimg" src = "smoothing.png"></img>
                        <input className = "up_add_window_slider" type = "range" id = "smoothing_sliderValue" min = "0" max = "100" defaultValue = "0"></input>
                        <input className = "up_add_window_field" type = "number" id = "smoothing_rangeValue" min = "0" max = "100" defaultValue = "0"></input>
                    </div>
                </div>
                <div className = "up_add_window" id = "eraser_window" style = {{ marginRight: "7.5%", display: "none" }}>
                    <div className = "eraser_window_thickness_block">
                        <img className = "thicknessimg" src = "thickness.png"></img>
                        <input className = "up_add_window_slider" type = "range" id = "e_thickness_sliderValue" min = "1" max = "100" defaultValue = "1"></input>
                        <input className = "up_add_window_field" type = "number" id = "e_thickness_rangeValue" min = "1" max = "100" defaultValue = "1"></input>
                    </div>
                </div>
                <button className = "up_panel_button_tool" id = "graphic_tablet" title = "Учитывать силу нажатия" style = {{ display: "none", position: "fixed", top: "4px", left: "10%" }}>
                    <img className = "up_panel_button_image" id = "graphic_tablet_image" src = "graphic_tablet.png"></img>
                </button>
                <div className = "palette_nav"></div>
                <div className = "nav">
                    <div className = "icon_buttons">
                        <button className = "up_panel_button" id = "arrow_back" title = {"Отменить"}>
                            <img className = "up_panel_button_image" id = "arrow_back_image" src = "undo_arrow.png"></img>
                        </button>
                        <button className = "up_panel_button" id = "arrow_next" title = "Повторить">
                            <img className = "up_panel_button_image" id = "arrow_next_image" src = "repeat_arrow.png"></img>
                        </button>
                        <button className = "up_panel_button" id = "palette" title = "Выбор цвета">
                            <img className = "up_panel_button_image" id = "clrimg" src = "palette.png" style = {{ filter: "invert(1)" }} ></img>
                        </button>
                        <button className = "up_panel_button_tool" id = "pencil" title = "Карандаш">
                            <img className = "up_panel_button_image" id = "pencil_image" src = "pencil.png"></img>
                        </button>
                        <button className = "up_panel_button_tool" id = "eraser" title = "Ластик">
                            <img className = "up_panel_button_image" id = "eraser_image" src = "eraser.png"></img>
                        </button>
                        <button className = "up_panel_button_tool" id = "bucket" title = "Заливка">
                            <img className = "up_panel_button_image" id = "bucket_image" src = "bucket.png"></img>
                        </button>
                        <button className = "up_panel_button_tool" id = "pipette" title = "Пипетка">
                            <img className = "up_panel_button_image" id = "pipette_image" src = "pipette.png"></img>
                        </button>
                        <button className = "up_panel_button" id = "clear" title = "Очистить рабочую область">
                            <img className = "up_panel_button_image" id = "clearimg" src = "clear.png"></img>
                        </button>
                        <button className = "up_panel_button" id = "upload" title = "Загрузить изображение на сайт">
                            <img className = "up_panel_button_image" id = "uploadimg" src = "upload.png"></img>
                            <input className = "hiddenInput" type = "file" accept = "image/*,.png,.jpg,.gif,.web,.bmp" id = "my_hidden_file" name = "loadfile"></input>
                        </button>
                        <button className = "up_panel_button" id = "save" title = "Сохранить изображение">
                            <img className = "up_panel_button_image" id = "saveimg" src = "save.png"></img>
                        </button>
                        <button className = "up_panel_button" id = "generate" data-toggle = "modal" title = "ИИ обработка">
                            <img className = "up_panel_button_image" id = "generateimg" src = "generate.png"></img>
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
            <Fragment>
                <ul className = "helpfull_links" style = {{ position: "fixed", right: "5px", top: "0px", textAlign: "right", width: "16%", height: "7%" }}>
                    <NavLink tag = {Link} className = "helpfull_link" to = {registerPath} style = {{ position: "fixed", top: "0%", width: "16%", textAlign: "right", right: "5px", textDecoration: "none" }}>
                        <font color = "#000000">
                            Регистрация
                        </font>
                    </NavLink>
                    <NavLink tag = {Link} className = "helpfull_link" to = {loginPath} style = {{ position: "fixed", top: "30px", width: "16%", textAlign: "right", right: "5px", textDecoration: "none" }}>
                        <font color = "#000000">
                            Вход
                        </font>
                    </NavLink>
                </ul>
                <div className = "start_page">
                    <img src = "logo.png" alt = "альтернативный текст" style = {{ border: "solid 4px #000000", borderRadius: "4px", position: "absolute", top: "10%", left: "45%", width: "10%" }}></img>
                    <div style = {{ position: "fixed", top: "40%", left: "15%", width: "70%", textAlign: "center" }}>
                        <p>
                            Веб платформа с нейронными сетями в качестве инструментов для упрощения работы художников, ретушёров, и, в перспективе, мультипликаторов. Внедрение нейронных сетей в процесс создания рисунков и обработанных фотографий позволяет значительно повысить скорость, эффективность и качество конечного результата. Для рисования анимаций, особенно малым коллективном, этот инструмент смог бы стать просто незаменимым, поскольку будет иметь возможность лишь по набору набросков опорных кадров в кратчайшие сроки воссоздать как отдельные детали самих кадров, так и сгенерировать промежуточные и улучшить их качество. В перспективе также планируется возможность добавления генерации саундтреков, звуков и возможно даже озвучания, и всё это на одной удобной платформе.
                        </p>
                    </div>
                    <NavLink className = "authLink btn btnLink textDark" tag = {Link} to = {registerPath} style = {{ position: "fixed",  left: "47.4%", top: "60%", width: "10%", height: "10%", fontSize: "200%" }}>
                        Начать
                    </NavLink>
                </div>
            </Fragment>
        );
    }
}