import React from "react";
import { useEffect, useRef } from "react";
import { BabylonScene } from "./babylonSceneLogic.ts";
import { Card } from "@mui/material";


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
			<Card
				variant="outlined"
				sx={{ display: "flex", justifyContent: "center", padding: '10px' }} >
				<canvas
					id='canvas'
					ref={babylonCanvas}
					style={{
						height: "80%", 
						width: "80%", 
						border: "5px", 
						borderRadius: "30px", 
						borderColor: "white"}}>

				</canvas>
			</Card>
		</>
	);
};