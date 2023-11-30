import cl from './LeftPanel.module.css'
import NeuralCard from '../NeuralCard/NeuralCard'
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import testMob from '../../../../store/neuralWindow.jsx'

const filterNeurals = (searchText, listOfNeurals) => {
	if (!searchText) {
		return listOfNeurals
	}

	return listOfNeurals.filter(({ clientName }) =>
		clientName[0].toLowerCase().includes(searchText.toLowerCase())
	)
}

const LeftPanel = observer(({ openParam, }) => {
	const [neuralList, setNeuralList] = useState(testMob.neurals)
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		const Debounce = setTimeout(() => {
			const filteredNeurals = filterNeurals(searchTerm, testMob.neurals)
			setNeuralList(filteredNeurals)
		}, 200)
		return () => clearTimeout(Debounce)
	}, [searchTerm])


	return (
		<section className={cl.finder}>
			<div className={cl.finderBlock}>
				<input
					value={searchTerm}
					type='text'
					placeholder="Поиск режима"
					className={cl.inputFinder}
					onChange={e => setSearchTerm(e.target.value)}
				>
				</input>
				<div className={cl.list}>
					{neuralList ? neuralList.map((neural, id) =>
						<NeuralCard
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