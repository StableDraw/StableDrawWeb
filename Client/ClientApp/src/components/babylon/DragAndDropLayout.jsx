import sceneClass from './stylesLight/scene.module.css'


export const DragAndDropLayout = ({children, send }) => {

	const onDropHandler = (e) => {
		e.preventDefault();
		let files = [...e.dataTransfer.files];
		let formData = new FormData();

		formData.append(`file`, files[0]);
		formData.append("Content-Type", 'multipart/form-data')

		send(formData)
	}

	const dragStartHandler = (e) => {
		e.preventDefault();
	};

	const dragLeaveHandler = (e) => {
		e.preventDefault();
	}

	return(
		<div className={sceneClass.canvasOut}
			onDragLeave={e => dragLeaveHandler(e)}
			onDrop={e => onDropHandler(e)}
			onDragOver={e => dragStartHandler(e)}>

				{children}
			
		</div>
	)
}
