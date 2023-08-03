import React, { useState } from "react";
import PropTypes from "prop-types";
import { Stage, Layer, Line } from "react-konva";
import DrawToolbar from "./DrawToolbar";
import { MODE, MODE3, COLOR_MAP, TEXT_SIZE } from "./constants";
import NewColorPalette from "./NewColorPalette";

const getScaledPoint = (stage, scale) => {
    const { x, y } = stage.getPointerPosition();
    return { x: x / scale, y: y / scale };
};

const DrawPane = props => {
    let stage = null;
    const [color, setColor] = useState("DARK");
    const [scale, setScale] = useState(1);
    const [mode, setMode] = useState(MODE.PENCIL);
    const [mode2, setMode2] = useState(MODE.RUBBER);
    const [mode3, setMode3] = useState(MODE3.COLOR_PALETTE);
    const [size, setSize] = useState(MODE.TEXT);
    const [currentLine, setCurrentLine] = useState(null);
    // const [currentwhiteLine, setCurrentwhiteLine] = useState(null);
    const [lines, setLines] = useState([]);

    const onMouseDown = () => {
        const { x, y } = getScaledPoint(stage, scale);
        setCurrentLine({ points: [x, y], color });

        // setCurrentwhiteLine({ points: [x, y], color: "rgb(255, 255, 255)" });
    };

    const onMouseMove = () => {
        if (currentLine) {
            const { x, y } = getScaledPoint(stage, scale);
            switch (mode) {
                case MODE.PENCIL:
                    setCurrentLine({
                        ...currentLine,
                        points: [...currentLine.points, x, y]
                    });
                    break;
                case MODE.LINE:
                    const [x0, y0] = currentLine.points;
                    setCurrentLine({
                        ...currentLine,
                        points: [x0, y0, x, y]
                    });
                    break;
                case MODE.BRUSH:
                    setCurrentLine({
                        ...currentLine,
                        points: [...currentLine.points, x, y]
                    });
                    break;

                default:
            }


            // eslint-disable-next-line
            // switch (mode2) {
            //     case MODE.RUBBER:
            //         setCurrentwhiteLine({
            //             ...currentwhiteLine,
            //             points: [...currentwhiteLine.points, x, y]
            //         });
            //         break;
            // }
        }
    };



    const onMouseUp = () => {
        const { x, y } = getScaledPoint(stage, scale);
        setCurrentLine(null);
        // setCurrentwhiteLine(null);
        setLines([
            ...lines,
            { ...currentLine, points: [...currentLine.points, x, y] },
            // { ...currentwhiteLine, points: [...currentwhiteLine.points, x, y] }
        ]);
    };

    const onSetMode = mode => {
        setMode(mode);
    };



    const onSetMode2 = mode2 => {
        setMode2(mode2);
    };
    const onSetMode3 = mode3 => {
        setMode3(mode3);
    };
    const setStageRef = ref => {
        if (ref) {
            stage = ref;
        }
    };

    const onChangeColor = color => {
        setColor(color);
    };

    const onChangeSize = size => {
        setSize(size);
    }

    const onChangeScale = delta => {
        setScale(scale + delta);
    };

    return (
        <div className="main-layout">
            <DrawToolbar
                mode={mode}
                mode3={mode3}
                color={color}
                scale={scale}
                size={size}
                onChangeColor={onChangeColor}
                onChangeSize={onChangeSize}
                onSetMode={onSetMode}
                onSetMode1={onSetMode}
                onSetMode2={onSetMode2}
                onSetMode3={onSetMode3}
                onChangeScale={onChangeScale}
            />
            <Stage
                ref={setStageRef}
                className="konva-container"
                width={props.width * scale}
                height={props.height * scale}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
            >
                <Layer>
                    <Line
                        {...currentLine}

                        scale={{x: scale, y: scale}}
                        strokeWidth={1}
                        stroke={COLOR_MAP[color]}
                    />
                    {lines.map((line, index) => (
                        <Line
                            key={index}
                            {...line}
                            scale={{x: scale, y: scale}}
                            strokeWidth={1}
                            stroke={COLOR_MAP[line.color]}
                        />
                    ))}
                </Layer>
            </Stage>
        </div>
    );
};

DrawPane.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
};

export default DrawPane;