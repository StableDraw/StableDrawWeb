import React from "react";
import { useEffect, useRef } from "react";
import { BabylonScene } from "./babylonSceneLogic.ts";
import { Card } from "@mui/material";
import sceneClass from './styles/scene.module.css'

// interface Props {
// 	modelFileName: string;
// 	sceneFileName: string;
// 	texture: string;
// }

export const Scene = ({
	modelFileName,
	sceneFileName,
	texture
}) => {
	const babylonCanvas = useRef(null);

	useEffect(() => {
		const canvas = babylonCanvas.current;

		if (!canvas) {
			alert("Your browser does not support Babylon.Js");
			return;
		}

		const scene = new BabylonScene(
			canvas,
			modelFileName,
			sceneFileName,
			texture).createScene();

		const resize = () => {
			scene.getEngine().resize();
		};

		const handleMouseWheel = (event) => {
			const isMouseOver = canvas === event.target;

			if (isMouseOver)
				event.preventDefault();
		}

		canvas.addEventListener("wheel", handleMouseWheel);

		if (window)
			window.addEventListener("resize", resize);

		return () => {
			scene.getEngine().dispose();

			canvas.removeEventListener("wheel", handleMouseWheel);

			if (window)
				window.removeEventListener("resize", resize);
		}
	});
	return (
		<>
			<canvas
					id='canvas'
					ref={babylonCanvas}
					className={sceneClass.canvas}>
			</canvas>
		</>
	);
};