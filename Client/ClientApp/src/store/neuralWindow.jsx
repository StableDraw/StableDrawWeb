import { makeAutoObservable, observable, action, configure } from 'mobx'
import api from '../api/apiNeurals'

class neuralWindow {
	neurals = {}
	activeNeuralName = '';
	parametrs = [];
	caption;
	defaultValue = {};
	isGenerationEnd = true;// флаг для отслеживания отправленной на генерацию картинки
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

		// проверяет, нужно ли отправлять дефолтное значение селектора для текущей модели
		const isValidSelector = (param) => {
			// проверяет имеет ли дефолтное значение селектора свойство child
			const isDefValueHasChild = (values) => {
				let isHasChild = false;
				values.forEach((value) => {
					if (Boolean(value.child) && param.default === value.value)
						isHasChild = true;
				})
				return isHasChild
			}

			if (param?.type === "select" && param !== "model" && param !== "version")
				return !(isDefValueHasChild(param.values) && !this.childValues.includes(param.default));
			else
				return true;
		}

		for (let item of this.parametrs) {
			const paramName = Object.keys(item)[0]
			//проверка на наличие поля system (чтобы не отправлять параметры с ним), а также проверка валидности параметров для отправки на сервер(селекторы проверяются ниже)
			if ((!item[paramName].hasOwnProperty("system") && !(!this.childParams.includes(paramName) && ((item[paramName].hasOwnProperty("child")))))) {
				if (item[paramName].default === "True") {
					result = ({ ...result, [paramName]: true })
				}
				else if (item[paramName].default === "False") {
					result = ({ ...result, [paramName]: false })
				}
				else {
					if (isValidSelector(item[paramName]))
						result = ({ ...result, [paramName]: item[paramName].default })
				}
			}
			this.defaultValue = result
			// console.log("на отправку: ", this.defaultValue)
		}
	}

	startGeneration = () => {
		this.isGenerationEnd = false;
	}

	endGeneration = () => {
		this.isGenerationEnd = true;
	}

	setCurrentModel = (currentModel) => {
		this.currentModel = currentModel;
	}

	setChildParams = (childParams) => {
		this.childParams.push(childParams);
	}

	clearChildParams = () => {
		this.childParams = [];
	}

	setChildValues = (childValues) => {
		if (childValues.length)
			this.childValues.push(...childValues)
	}

	clearChildValues = () => {
		this.childValues = [];
	}
}

export default new neuralWindow()