import React from "react";
import { useEffect, useRef,} from "react";
import { BabylonScene } from "./babylonSceneLogic.ts";
import sceneClass from './stylesLight/scene.module.css'

export const Scene = ({
	modelFileName,
	sceneFileName,
	texture,
}) => {
	const babylonCanvas = useRef(null);
	const babylonLoader = useRef(null);


	useEffect(() => {
		const canvas = babylonCanvas.current;
		const loader = babylonLoader.current;

		if (!canvas) {
			alert("Your browser does not support Babylon.Js");
			return;
		}

		const scene = new BabylonScene(
			canvas,
			loader,
			modelFileName,
			sceneFileName,
			texture,).createScene();

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

	// const elem = document.getElementById('loader')
	// elem.innerText = '0'
	// console.log(elem.innerText)
	return (
		<>
		{/* <div 
			style={{position:'absolute', color:'white', fontSize:'20px', zIndex:'100'}}
			// className={sceneClass.loadingCustom} 
			id="loader"
			ref={babylonLoader}>
			25%
		</div> */}
			<canvas
				id='canvas'
				ref={babylonCanvas}
				className={sceneClass.canvas}
			>

			</canvas>
			
		</>
	);
};