import InputRange from '../InputRange/InputRange'
import InputText from '../InputText/InputText'
import MySelect from '../MySelect/MySelect'
import MyCheckBox from '../MyCheckBox/MyCheckBox'
import testMob from '../../../../../store/neuralWindow.jsx'
import { observer } from 'mobx-react-lite'



export const ParamSwitch = observer(({value, id, setValueForServer}) => {
	const key = Object.keys(value); //название параметра(системное)

	//задаёт массивы дочерних параметров и значений селекторов в зависимости от текущей модели/версии
	const setChild = (currentModel) => {
		if ((key[0] === "model" || key[0] === "version")) {
			value[key].values.map((model) => {
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
		return !(!testMob.childParams.includes(key[0]) && Boolean(value[key]?.child))
	}
	//параметры с полем system не отображаем
	if (!Object.hasOwn(value[key], "system")) {
		const type = value[key].type;
		switch (type) {
			case 'select':
				return <MySelect
					key={id}
					keyValue={key}
					name={value[key].name}
					defaultV={value[key].default}
					options={value[key].values}
					description={value[key].description}
					getValue={setValueForServer}
					setChild={setChild} />
			case 'text':
				return <InputText
					key={id}
					keyValue={key}
					name={value[key].name}
					defaultV={value[key].default}
					description={value[key].description}
					getValue={setValueForServer}
					isValidParam={isValid}
				/>
			case 'range':
				return <InputRange
					key={id}
					keyValue={key}
					name={value[key].name}
					defaultV={value[key].default}
					step={value[key].step}
					min={value[key].min}
					max={value[key].max}
					description={value[key].description}
					getValue={setValueForServer}
					isValidParam={isValid}
				/>
			case 'boolean':
				return <MyCheckBox
					key={id}
					keyValue={key}
					name={value[key].name}
					defaultV={value[key].default === 'True' ? true : false}
					description={value[key].description}
					getValue={setValueForServer}
					isValidParam={isValid}
				/>
			default:
		}
	}
})