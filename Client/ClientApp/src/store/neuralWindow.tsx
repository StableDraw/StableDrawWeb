import {makeAutoObservable,observable, action} from 'mobx'
import api from '../api/apiNeurals'
class neuralWindow {
    neurals:{} = {}
    activeNeuralName:string = ''
    parametrs:object[] = []
    caption:boolean
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
            // console.log(JSON.parse(JSON.stringify(response.data)))
        } catch(e) {
            console.error(e)
            throw(e)
        }
    }
    async getParams(name:string) {
        try {
            const response = await api.GetNeurals(name)
            // console.log(JSON.parse(JSON.stringify(response.data.params)))
            const test:Array<Object> = (response.data.params)
            console.log(test.length)
            
            this.setActiveNeural(name)
            response.data.caption ? this.caption = true : this.caption = false
            const array:object[] = []
            for (let item of response.data.params) {
                const param:{} = (item)
                array.push(param)
            }
            console.log(array)
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