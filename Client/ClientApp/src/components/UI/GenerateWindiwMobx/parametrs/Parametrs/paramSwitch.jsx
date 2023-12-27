import { observer } from "mobx-react-lite";
import testMob from "../../../../../store/neuralWindow.jsx";
import InputRange from "../InputRange/InputRange";
import InputText from "../InputText/InputText";
import MyCheckBox from "../MyCheckBox/MyCheckBox";
import MySelect from "../MySelect/MySelect";

export const ParamSwitch = observer(({ value, id, setValueForServer }) => {
	const paramName = Object.keys(value); //название параметра(системное) в массиве

	//возвращает false, если у параметра есть свойство child и при этом его нет в массиве дочерних параметров к текущей модели
	const isValid = () => {
		return !(!testMob.childParams.includes(paramName[0]) && Boolean(value[paramName]?.child));
	};

	//параметры с полем system не отображаем
	if (!Object.hasOwn(value[paramName], "system")) {
		const type = value[paramName].type;
		switch (type) {
			case "select":
				return (
					<MySelect
						isChild={value[paramName].child}
						key={id}
						keyValue={paramName}
						name={value[paramName].name}
						defaultV={value[paramName].default}
						options={value[paramName].values}
						description={value[paramName].description}
						getValue={setValueForServer}
					/>
				);
			case "text":
				return (
					<InputText
						key={id}
						keyValue={paramName}
						name={value[paramName].name}
						defaultV={value[paramName].default}
						description={value[paramName].description}
						getValue={setValueForServer}
						isValidParam={isValid}
					/>
				);
			case "range":
				return (
					<InputRange
						key={id}
						keyValue={paramName}
						name={value[paramName].name}
						defaultV={value[paramName].default}
						step={value[paramName].step}
						min={value[paramName].min}
						max={value[paramName].max}
						description={value[paramName].description}
						getValue={setValueForServer}
						isValidParam={isValid}
					/>
				);
			case "boolean":
				return (
					<MyCheckBox
						isChilds={value[paramName].childs} //передаём дочерние параметры (может принимать undefined)
						key={id}
						keyValue={paramName}
						name={value[paramName].name}
						//оставил полюбоваться строчкой кода одного из наших бывших "разработчиков"
						defaultV={value[paramName].default === "True" ? true : false}
						description={value[paramName].description}
						getValue={setValueForServer}
						isValidParam={isValid}
					/>
				);
			default:
		}
	}
});
