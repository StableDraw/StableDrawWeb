import { makeAutoObservable, observable, action, configure, values } from 'mobx'
import api from '../api/apiNeurals'

class neuralWindow {
	neurals = {}
	activeNeuralName = '';
	parametrs = [];
	caption;
	neuralWindowImages = []; // массив картинок, которые в данный момент загружены в окно генерации
	defaultValue = {}; //объект дефолтных значений параметров(костыль Серёги, нужно переписать на useEffect)
	isGenerationEnd = true; // флаг для отслеживания отправленной на генерацию картинки
	currentModel = ''; // текущая модель/версия для генерации
	childParams = []; // массив дочерних параметров для текущей модели
	childValues = []; // массив дочерних значений для селекторов для текущей модели


	constructor() {
		makeAutoObservable(this, {
			activeNeuralName: observable,
			getParams: action,
		})
		configure({
			enforceActions: "never", // отключил предупреждения 
		})
	}

	async getNeurals() {
		try {
			const response = await api.GetNeuralsList()
			this.neurals = response.data
		} catch (e) {
			console.error(e)
			throw (e)
		}
	}

	//задаёт текущую модель при смене нейросети. 
	//В качестве текущей модели ставится default value параметра version или model.
	//Обращаю внимание, что если массив childs будет не в этих параметрах(version или model), то логика сломается 
	setCurrentModelOnMount = (params) => {
		//проверяет наличие параметра childs в наборе значений для параметра version или model
		const isAnyChilds = (values) => {
			return values?.some(value => value.hasOwnProperty("childs"))
		}

		params.forEach((param) => {
			if ((param.hasOwnProperty("model") || param.hasOwnProperty("version")) &&
				(isAnyChilds(param?.model?.values) || isAnyChilds(param?.version?.values))) {

				if (param?.model?.default)
					this.setCurrentModel(param?.model?.default);

				if (param?.version?.default)
					this.setCurrentModel(param?.version?.default);
			}
		})
	}

	async getParams(name) {
		try {
			const response = await api.GetNeurals(name)
			this.setActiveNeural(name)
			response.data.caption ? this.caption = true : this.caption = false
			const array = []

			for (let item of response.data.params) {
				const param = item;
				array.push(param)
			}
			this.parametrs = array
			this.setCurrentModelOnMount(array)//задаём модель генерации
			this.doDefaultValues()
		} catch (e) {
			console.error(e)
			throw (e)
		}
	}

	setActiveNeural(name) {
		this.activeNeuralName = name
	}

	doDefaultValues = () => {
		let result = {}
		this.defaultValue = {};

		// проверяет имеет ли дефолтное значение селектора свойство child (можно было проверять просто наличие param.default в массиве childValues, перестраховался)
		const isDefValueHasChild = (param) => {
			let isHasChild = false;
			param.values.forEach((value) => {
				if (Boolean(value.child) && param.default === value.value)
					isHasChild = true;
			})
			return isHasChild
		}

		// проверяет, нужно ли отправлять на сервер дефолтное значение селектора для текущей модели
		const isValidDefSelectorValue = (param) => {
			if (param?.type === "select" && param !== "model" && param !== "version") {
				return !(isDefValueHasChild(param) && !this.childValues.includes(param.default) && !this.childParams.includes(param));
			}
			else
				return true;
		}

		// задаёт новое дефолтное значение селектору, в случае, если для текущей модели его базовое дефолтное значение не используется
		const setNewDefValue = (param) => {
			let newDefault = '';
			for (const value of param.values) {
				if (this.childValues.includes(value.value)) {
					newDefault = value.value;
					return newDefault;
				}
			}

			return newDefault;
		}

		for (let item of this.parametrs) {
			const paramName = Object.keys(item)[0]
			//проверка на наличие поля system (чтобы не отправлять параметры с ним), а также проверка валидности параметров для отправки на сервер(селекторы проверяются ниже)
			if ((!item[paramName].hasOwnProperty("system") && !(!this.childParams.includes(paramName) && ((item[paramName].hasOwnProperty("child")))))) {
				if (item[paramName].default === "True") { // переписать json и убрать этот костыль нах*й
					result = ({ ...result, [paramName]: true })
				}
				else if (item[paramName].default === "False") {// переписать json и убрать этот костыль нах*й
					result = ({ ...result, [paramName]: false })
				}
				else {
					//если def селектор не валиден => проверяем остальные значения селектора и задаём новое def знач
					if (isValidDefSelectorValue(item[paramName]))
						result = ({ ...result, [paramName]: item[paramName].default })
					else {
						const newDefault = setNewDefValue(item[paramName])

						if (newDefault)
							result = ({ ...result, [paramName]: newDefault })
					}

				}
			}
			this.defaultValue = result
		}
	}

	startGeneration = () => {
		this.isGenerationEnd = false;
	}

	endGeneration = () => {
		this.isGenerationEnd = true;
	}
	//задаёт текущую модель/версию для генерации
	setCurrentModel = (currentModel) => {
		this.clearChildParams()
		this.clearChildValues()
		this.currentModel = currentModel;
	}

	// заполняет массив дочерних параметров для текущей модели
	setChildParams = (childParams) => {
		this.childParams.push(childParams);
	}

	//заполняет массив дочерних значений для текущей модели
	setChildValues = (childValues) => {
		if (childValues.length)
			this.childValues.push(...childValues)
	}
	clearChildParams = () => {
		this.childParams = [];
	}

	clearChildValues = () => {
		this.childValues = [];
	}

	setNeuralWindowImages = (images) => {
		this.neuralWindowImages = images
	}

}

export default new neuralWindow()