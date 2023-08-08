"use strict";
import React, {useCallback, useState, Component} from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

const Maintest = () => {
    const body = createRoot(document.querySelector("body"));
    const cursor = createRoot(document.querySelector(".cursor"));
    const cursor_image = createRoot(document.querySelector(".cursimg"));
    let cursor_type = -1;
    const nav_panel = createRoot(document.querySelector(".nav"));
    const canvas_foreground = createRoot(document.getElementById("canvas_foreground"));
    const canvas_background = createRoot(document.getElementById("canvas_background"));
    const canvas_additional = createRoot(document.getElementById("canvas_additional"));
    const canvas_layer_1 = createRoot(document.getElementById("layer_1_display_canvas"));
    const canvas_layer_2 = createRoot(document.getElementById("layer_2_display_canvas"));
    const layer_icon_1 = createRoot(document.getElementById("layer_display_icon_1"));
    const layer_icon_2 = createRoot(document.getElementById("layer_display_icon_2"));
    const d_frame = createRoot(document.getElementById("d_frame"));
    const spanel = createRoot(document.getElementById("mySidepanel"));
    const spanel_openbtn = createRoot(document.querySelector(".openbtn"));
    const generateBtn = createRoot(document.getElementById("generate"));
    const clr_w = createRoot(document.getElementById("clr_window"));
    const pencil_w = createRoot(document.getElementById("pencil_window"));
    const eraser_w = createRoot(document.getElementById("eraser_window"));
    const ok_clr_btn = createRoot(document.getElementById("ok_clr_btn"));
    const cur_color = createRoot(document.getElementById("color"));
    const clrimg = createRoot(document.getElementById("clrimg"));
    const ctx_foreground = canvas_foreground.createRoot(document.getContext("2d", { willReadFrequently: true }));
    const ctx_background = canvas_background.createRoot(document.getContext("2d", { willReadFrequently: true }));
    const ctx_add = canvas_additional.createRoot(document.getContext("2d", { willReadFrequently: true }));
    const ctx_layer_1 = canvas_layer_1.createRoot(document.getContext("2d", { willReadFrequently: true }));
    const ctx_layer_2 = canvas_layer_2.createRoot(document.getContext("2d", { willReadFrequently: true }));
    const ratio_field = createRoot(document.querySelector(".f_ratio"));
    const ratio_tooltip = createRoot(document.querySelector("ratio_tooltip"));
    const thickness_slider = createRoot(document.getElementById("thickness_sliderValue"));
    const thickness_field = createRoot(document.getElementById("thickness_rangeValue"));
    const smoothing_slider =createRoot(document.getElementById("smoothing_sliderValue"));
    const smoothing_field = createRoot(document.getElementById("smoothing_rangeValue"));
    const e_thickness_slider = createRoot(document.getElementById("e_thickness_sliderValue"));
    const e_thickness_field = createRoot(document.getElementById("e_thickness_rangeValue"));
    const layer_1 = createRoot(document.getElementById("layer_1"));
    const layer_2 =createRoot(document.getElementById("layer_2"));
    const scale_field = createRoot(document.querySelector(".scale_field"));
    const div_layers = createRoot(document.querySelector(".layers"));
    const layers_buttons = createRoot(document.querySelector(".layers_buttons"));
    const text_label_clr = createRoot(document.getElementById("text_label_clr"));
    const blackout = createRoot(document.getElementById("full_blackout"));
    const side_panel_blackout = createRoot(document.getElementById("side_panel_blackout"));
    const before_gen_block = createRoot(document.getElementById("before_gen_block"));
    const close_before_gen_block = createRoot(document.getElementById("close_before_gen_block"));
    const before_gen = createRoot(document.getElementById("before_gen"));
    const before_gen_ctx = before_gen.createRoot(document.getContext("2d", { willReadFrequently: true }));
    const change_themeBtn = createRoot(document.getElementById("change_theme"));
    const tmimg = createRoot(document.getElementById("theme_mode_img"));
    const graphic_tabletBtn = createRoot(document.getElementById("graphic_tablet"));
    const first_layer_visibilityBtn = createRoot(document.getElementById("layer_1_visibility_button"));
    const first_layer_visibility_img = createRoot(document.getElementById("layer_1_visibility_img"));
    const second_layer_visibilityBtn = createRoot(document.getElementById("layer_2_visibility_button"));
    const second_layer_visibility_img = createRoot(document.getElementById("layer_2_visibility_img"));
    const clear_first_layer_Btn = createRoot(document.getElementById("clear_layer_1"));
    const clear_second_layer_Btn = createRoot(document.getElementById("clear_layer_2"));
    const select_first_layerBtn = createRoot(document.getElementById("layer_button_1"));
    const colourBtn = createRoot(document.getElementById("palette"));
    const ok_clr = createRoot(document.querySelector(".ok_clr_btn"));
    const ctype_clr_btn = createRoot(document.querySelector(".ctype_clr_btn"));
    const id_list = ['p', 'i', 'u', 'f'];
    const Pi_div_4 = Math.PI / 4;
    let nstack = [];
    let pstack = [];
    let curprim = [];
    let fp = true;
    let on_d_frame = false;
    let on_d_fiend = false;
    let prevX;
    let prevY;
    let move_prevX;
    let move_prevY;
    let X_move;
    let Y_move;
    let cX;
    let cY;
    let is_shift_on = false;
    let fup = false;
    let fdown = false;
    let fright = false;
    let fleft = false;
    let cfup = false;
    let cfleft = false;
    let W = window.innerWidth;
    let H = window.innerHeight;
    let fW_max = W * 0.8;
    let fH_max = H * 0.8;
    let fW_min = W * 0.1;
    let fH_min = H * 0.1;
    let cW = canvas_foreground.offsetWidth;
    let cH = canvas_foreground.offsetHeight;
    let cD = cW / cH;
    let Max_cW = cW;
    let Max_cH = cH;
    let lW = layer_icon_1.offsetWidth;
    let lH = layer_icon_1.offsetHeight;
    let lwW = canvas_layer_1.width;
    let lwH = canvas_layer_1.height;
    let orig_lW = lW;
    let orig_lH = lH;
    let orig_lD = lW / lH;
    if (cD > orig_lD) {
        lW = orig_lW;
        lH = orig_lW / cD;
    }
    else {
        lH = orig_lH;
        lW = orig_lH * cD;
    }
    let lWp = Math.round(995 * (lW / orig_lW)) / 10 + "%";
    let lHp = Math.round(1000 * (lH / orig_lH)) / 10 + "%";
    layer_icon_1.style.width = lWp;
    layer_icon_2.style.width = lWp;
    layer_icon_1.style.height = lHp;
    layer_icon_2.style.height = lHp;
    /*layer_alpha_img_1.width = lWp
    layer_alpha_img_1.height = lHp
    layer_alpha_img_2.width = lWp
    layer_alpha_img_2.height = lHp*/
    let cur_real_ratio = cH / cW;
    let l_width = 1;
    let W_f = (W - cW) / 2 - l_width / 2 + 12;
    let H_f = (H - cH) / 2 - l_width / 2 + 12;
    let f_dW = d_frame.offsetWidth;
    let f_dH = d_frame.offsetHeight;
    let orig_f_dW = f_dW;
    let orig_f_dH = f_dH;
    let fW_pred = orig_f_dW;
    let fH_pred = orig_f_dH;
    let cmp_W = 1;
    let cmp_H = 1;
    let cmp_W_b = 0;
    let cmp_H_b = 0;
    d_frame.width = f_dW;
    d_frame.height = f_dH;
    let H_min = (H - f_dH) / 4;
    let H_max = f_dH + H_min;
    let W_min = (W - f_dW) / 4;
    let W_max = f_dW + W_min;
    canvas_foreground.height = cH;
    canvas_foreground.width = cW;
    canvas_background.height = cH;
    canvas_background.width = cW;
    canvas_additional.height = cH;
    canvas_additional.width = cW;
    let draw = false;
    let enddraw = false;
    let f_move = false;
    let end_f_move = false;
    let old_btn_clr = [false, true]; //изначально чёрный текст у кнопок цвета
    let on_clr_window = false;
    let cur_background_clr = "#fff";
    let new_background_clr = cur_background_clr;
    let cur_brush_clr = "#000000";
    ctx_background.fillStyle = cur_background_clr; //заливка фона белым, костыль, убрать
    ctx_layer_2.fillStyle = cur_background_clr; //заливка иконки фона белым, костыль, убрать
    pstack.push(['i', ctx_background, cur_background_clr]);
    ctx_background.fillRect(0, 0, cW, cH);
    ctx_layer_2.fillRect(0, 0, cW, cH);
    let is_clr_brash = true;
    let cur_ratio_val = get_visual_ratio(false, cW, cH);
    ratio_field.value = cur_ratio_val; //устанавливаем соотношение сторон при запуске
    let is_first_upload_btn_click = true; //костыль, чтобы кнопка не срабатывала дважды
    let is_foreground_selected = true; //выбран ли верхний слой, по-умолчанию выбран
    let cur_draw_ctx = ctx_foreground; //текущий выбранный слой для рисования, по-умолчанию верхний
    let cur_canvas = canvas_foreground; //текущий выбранный слой для рисования ввиде слоя, не контекста, по-умолчанию верхний
    let cur_ctx_layer = ctx_layer_1; //текущий выбранный слой для рисования ввиде контекста кнопки который в углу, по-умолчанию верхний
    let graphic_tablet_mode = false; //режим графического планшета
    let is_clr_window = false; //отображение окна с палитрой
    let is_pencil_window = true; //отображение окна настроек кисти
    let is_eraser_window = false; //отображение окна настроек ластика
    let cur_smoothing = 0; //параметр сглаживания
    let cur_smooth_prim = []; //текущий сглаженный примитив
    let k_smooth = 0; //текущий коэффициент сглаживания
    let is_foreground_visible = true; //включена ли видимость переднего слоя
    let is_background_visible = true; //включена ли видимость заднего слоя
    ctx_foreground.lineCap = "round";
    ctx_foreground.lineJoin = "round";
    ctx_add.lineCap = "round";
    ctx_add.lineJoin = "round";
    ctx_background.lineCap = "round";
    ctx_background.lineJoin = "round";
    layer_1.style.border = "1px solid #000000";
    layer_1.style.outline = "3px solid #000000";
    layer_2.style.border = "none";
    layer_2.style.outline = "1px solid #000000";
    let is_dark_mode = false; //тёмная тема (отключена по-умолчанию)
    let is_modal_open = false;
    let is_side_panel_open = false;
    let caption_field;
    let style_field;
    let modal_header;
    let modal_body;
    let modal_footer;
    let is_human_caption;
    let original_image_buf = ""; //переменная для хранения исходных изображений
    let original_image_w; //переменная для хранения ширины исходного изображения
    let original_image_h; //переменная для хранения высоты исходного изображения
    let need_gen_after_caption = [false, false, false, false];
    const Max_bib_w = W * 0.2;
    const Max_bib_h = H * 0.2;
    let data_prop;
    let ws = new WebSocket("wss://stabledraw.com:8081");
    let chain_id = "";
    let task_id;
    const subbody = createRoot(document.querySelector(".subbody"));
    let if_first_time_modal = true;
    const setpipetteBtn = createRoot(document.getElementById("pipette"));
    const saveBtn = createRoot(document.getElementById("save"));
    const mhf = createRoot(document.getElementById("my_hidden_file"));
    const uploadBtn = createRoot(document.getElementById("upload"));
    const clearBtn = createRoot(document.getElementById("clear"));
    const setbucketBtn = createRoot(document.getElementById("bucket"));
    const seteraserBtn = createRoot(document.getElementById("eraser"));
    const setpencilBtn = createRoot(document.getElementById("pencil"));
    const swap_layersBtn = createRoot(document.getElementById("swap_layers"));
    const merge_layersBtn = createRoot(document.getElementById("merge_layers"));
    const select_second_layerBtn = createRoot(document.getElementById("layer_button_2"));
    const closeeBtn = createRoot(document.getElementById("size_panel_closebtn"));
    const openBtn = createRoot(document.querySelector(".openbtn"));
    let backBtn = createRoot(document.getElementById("arrow_back"));
    let nextBtn = createRoot(document.getElementById("arrow_next"));
    let last_task_image_name = "drawing.png";
    let last_task_image_suffix = "0";
    let slider_range = createRoot(document.querySelectorAll('input[type="range"]'));
    let slider_element;
    colourBtn.style.background = "#000000";
    setpencilBtn.style.border = "5px solid #000000";
    setpencilBtn.style.transform = "translateY(7%)";
    let cur_tool = ['k', setpencilBtn, "aero_pen.cur"]; //текущий инструмент (карандаш)

    
    return (
        <div>
            
        </div>
    );
};

export default Maintest;
