import cl from './LeftPanel.module.css'
import NeuralCard from '../NeuralCard/NeuralCard'
import { useEffect, useState, } from 'react'
import { observer } from 'mobx-react-lite'
import testMob from '../../../../store/neuralWindow.jsx'


const LeftPanel = observer(({ openParam, }) => {
	const [searchValue, setSearchValue] = useState('')
	const [neuralList, setNeuralList] = useState([])

	useEffect(() => {
		if (!searchValue)
			setNeuralList(testMob.neurals)
		else
			setNeuralList(searchNeuron())

			console.log(neuralList)
	}, [searchValue])

	//фильтруем список нейросетей по искомому значению
	const searchNeuron = () => {
		const requiredNeurons = testMob.neurals.filter((neural) => {
			return neural.clientName.toLowerCase().includes(searchValue.toLowerCase())
		})

		return requiredNeurons; // новый список для отображения
	}
	return (
		<section className={cl.finder}>
			<div className={cl.finderBlock}>
				<input
					type='text'
					placeholder="Поиск режима"
					className={cl.inputFinder}
					onChange={e => setSearchValue(e.target.value)}
				>
				</input>
				<div className={cl.list}>
					{Boolean(neuralList) ? neuralList.map((neural, id) =>
						<NeuralCard
							imgCount={neural.imageCount}
							key={id}
							active={openParam}
							serverName={neural.serverName}
							clientName={neural.clientName}
							description={neural.description}
						/>) :
						<div>Ошибка в запросе</div>}
				</div>
			</div>
		</section>
	)
})

export default LeftPanel