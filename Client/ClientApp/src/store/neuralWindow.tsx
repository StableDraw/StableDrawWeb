import {makeAutoObservable,observable, action} from 'mobx'
import api from '../api/apiNeurals'
class neuralWindow {
    neurals:{} = {}
    activeNeuralName:string = ''
    parametrs:object[] = []
    defaultValue = {}
    constructor() {
        makeAutoObservable(this, {
            activeNeuralName: observable,
            getParams: action,
        })
    }

    async getNeurals() {
        try {
            const response = await api.GetNeuralsList()
            this.neurals = response.data
        } catch(e) {
            console.error(e)
            throw(e)
        }
    }
    async getParams(name:string) {
        try {
            const response = await api.GetNeurals(name)
            this.setActiveNeural(name)

            const array:object[] = []
            for (let item of response.data.params) {
                const param:{} = JSON.parse(item)
                array.push(param)
            }
            this.parametrs = array
            this.doDefaultValues()
        } catch(e) {
            console.error(e)
            throw(e)
        }
    }
    setActiveNeural(name:string) {
        this.activeNeuralName = name
    }

     doDefaultValues = () => {
        let result = {}
        for(let item of this.parametrs) {
            const key:string[] = Object.keys(item)
            result = ({...result, [key[0]]:item[key[0]].default})            
        }
        this.defaultValue = result      
    }
    
}
export default new neuralWindow()