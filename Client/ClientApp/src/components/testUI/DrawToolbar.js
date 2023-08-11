import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import ReactDOM from "react-dom";
import { Stage, Layer, Group, Rect, useStrictMode } from "react-konva";
import PropTypes from "prop-types";
import cn from "classnames";
import { ReactComponent as PencilIcon } from "./icons/pencil.svg";
import { ReactComponent as LineIcon } from "./icons/figures/line.svg";
import { ReactComponent as BrushIcon } from "./icons/brush.svg";
import { ReactComponent as RubberIcon } from "./icons/eraser.svg";
import {ReactComponent as FillerIcon } from "./icons/filler.svg";
import {ReactComponent as TextIcon } from "./icons/text.svg";
import {ReactComponent as HandIcon } from "./icons/hand.svg";
import {ReactComponent as LassoIcon } from "./icons/lasso.svg";
import {ReactComponent as PipetteIcon } from "./icons/pipette.svg";
import {ReactComponent as ColorFilterIcon } from "./icons/color_filter.svg";
import {ReactComponent as ColorPaletteIcon } from "./icons/color_palette.svg";
import {ReactComponent as MoveIcon } from "./icons/move.svg";
import {ReactComponent as BrightIcon } from "./icons/bright.svg";
import {ReactComponent as FrameIcon } from "./icons/frame.svg";
import {ReactComponent as FIGURESIcon } from "./icons/figures/polygon.svg";
import { MODE, MODE3 } from "./constants";
import ColorPalette from "./ColorPalette";
import NewColorPalette from "./NewColorPalette";
import ZoomPanel from "./ZoomPanel";
import Text from "./Text";
import Konva from "konva";

function DrawToolbar(props) {

    const onChangeMode = (mode) => () => {
        props.onSetMode(mode);
    };

    const onChangeMode3 = (mode3) => () => {
         props.onSetMode3(mode3);
    };

    const [liked, setLiked] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [checked, setChecked] = useState("clr_window1");
    // const handleClick = () => {
    //     this.setState({
    //         color: Konva.Util.getRandomColor()
    //     });
    // };

    return (
        <div className="toolbar">
            <PencilIcon
                className={cn({
                    selected: props.mode === MODE.PENCIL
                })}
                width="32"
                height="32"
                onClick={onChangeMode(MODE.PENCIL)}
            />
            <LineIcon
                className={cn({
                    selected: props.mode === MODE.LINE
                })}
                width="32"
                height="32"
                onClick={onChangeMode(MODE.LINE)}
            />
            <BrushIcon
                className={cn({
                    selected: props.mode === MODE.BRUSH
                })}
                width="32"
                height="32"
                onClick={onChangeMode(MODE.BRUSH)}
            />
            <RubberIcon
                className={cn({
                    selected: props.mode === MODE.RUBBER
                })}
                width="32"
                height="32"
                onClick={onChangeMode(MODE.RUBBER)}
            />
            <FillerIcon
                className={cn({
                    selected: props.mode === MODE.FILLER
                })}
                width="32"
                height="32"
                onClick={onChangeMode(MODE.FILLER)}
            />
            <TextIcon
                className={cn({
                    selected: props.mode === MODE.TEXT
                })}
                width="32"
                height="32"
                onClick={onChangeMode(MODE.TEXT)}
            />
            <Text
                color={props.color}
                onChangeColor={props.onChangeColor}
                size={props.size}
                onChangeSize={props.onChangeSize}
            />
            <HandIcon
                className={cn({
                    selected: props.mode === MODE.HAND
                })}
                width="32"
                height="32"
                onClick={onChangeMode(MODE.HAND)}
            />
            <LassoIcon
                className={cn({
                    selected: props.mode === MODE.LASSO
                })}
                width="32"
                height="32"
                onClick={onChangeMode(MODE.LASSO)}
            />
            <PipetteIcon
                className={cn({
                    selected: props.mode === MODE.PIPETTE
                })}
                width="32"
                height="32"
                onClick={onChangeMode(MODE.PIPETTE)}
            />
            <ColorFilterIcon
                className={cn({
                    selected: props.mode === MODE.COLOR_FILTER
                })}
                width="32"
                height="32"
                onClick={onChangeMode(MODE.COLOR_FILTER)}
            />
            <MoveIcon
                className={cn({
                    selected: props.mode === MODE.MOVE
                })}
                width="32"
                height="32"
                onClick={onChangeMode(MODE.MOVE)}
            />
            <BrightIcon
                className={cn({
                    selected: props.mode === MODE.BRIGHT
                })}
                width="32"
                height="32"
                onClick={onChangeMode(MODE.BRIGHT)}
            />
            <FrameIcon
                className={cn({
                    selected: props.mode === MODE.FRAME
                })}
                width="32"
                height="32"
                onClick={onChangeMode(MODE.FRAME)}
            />
            <NewColorPalette
                // onClick={() => {
                //     setLiked(!liked);
                //     setClicked(true);
                // }}
                // onAnimationEnd={() => setClicked(false)}
                // className={cn("like-button-wrapper", {
                //     liked,
                //     clicked,
                // })}
                width="32"
                height="32"
                onClick={() => {
                    setChecked("clr_window1")
                    setClicked(true)
                }}
                // onClick={onChangeMode3(MODE3.COLOR_PALETTE)}
                />
            <FIGURESIcon
                className={cn({
                    selected: props.mode === MODE.FIGURES
                })}
                width="32"
                height="32"
                onClick={onChangeMode(MODE.FIGURES)}
            />

            <ColorPalette color={props.color} onChangeColor={props.onChangeColor} />
            <ZoomPanel scale={props.scale} onChangeScale={props.onChangeScale} />

        </div>
    );
}

DrawToolbar.propTypes = {
    scale: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    onSetMode: PropTypes.func.isRequired,
    onSetMode3: PropTypes.func.isRequired,
    onChangeColor: PropTypes.func.isRequired,
    onChangeScale: PropTypes.func.isRequired,
    onChangeSize: PropTypes.func.isRequired,
};

export default DrawToolbar;