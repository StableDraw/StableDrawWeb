import InputRange from '../InputRange/InputRange'
import InputText from '../InputText/InputText'
import MySelect from '../MySelect/MySelect'
import MyCheckBox from '../MyCheckBox/MyCheckBox'
import testMob from '../../../../../store/neuralWindow.jsx'
import { observer } from 'mobx-react-lite'



export const ParamSwitch = observer(({value, id, setValueForServer}) => {
	const paramName = Object.keys(value); //название параметра(системное) в массиве

	//задаёт массивы дочерних параметров и значений селекторов в зависимости от текущей модели/версии
	const setChild = (currentModel) => {
		if ((paramName[0] === "model" || paramName[0] === "version")) {
			value[paramName].values.map((model) => {
				if (model.value === currentModel && Object.hasOwn(model, "childs")) {
					model.childs.map((child) => {
						testMob.setChildParams(child.param_id)
						testMob.setChildValues(child.values_id)
					})
				} else if (!Object.hasOwn(model, "childs") && model.value === currentModel) {
					testMob.setCurrentModel('');
					testMob.clearChildParams();
					testMob.clearChildValues();
				}
			})
		}
	}

	//возвращает false, если у параметра есть свойство child и при этом его нет в массиве дочерних параметров к текущей модели
	const isValid = () => {
		return !(!testMob.childParams.includes(paramName[0]) && Boolean(value[paramName]?.child))
	}
	//параметры с полем system не отображаем
	if (!Object.hasOwn(value[paramName], "system")) {
		const type = value[paramName].type;
		switch (type) {
			case 'select':
				return <MySelect
					key={id}
					keyValue={paramName}
					name={value[paramName].name}
					defaultV={value[paramName].default}
					options={value[paramName].values}
					description={value[paramName].description}
					getValue={setValueForServer}
					setChild={setChild} />
			case 'text':
				return <InputText
					key={id}
					keyValue={paramName}
					name={value[paramName].name}
					defaultV={value[paramName].default}
					description={value[paramName].description}
					getValue={setValueForServer}
					isValidParam={isValid}
				/>
			case 'range':
				return <InputRange
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
			case 'boolean':
				return <MyCheckBox
					key={id}
					keyValue={paramName}
					name={value[paramName].name}
					//оставил полюбоваться строчкой кода коллеги(Привет, Сергей)
					defaultV={value[paramName].default === 'True' ? true : false}
					description={value[paramName].description}
					getValue={setValueForServer}
					isValidParam={isValid}
				/>
			default:
		}
	}
})