import mainStyles from './styles/main.module.css'
import { Header } from "./header";
import { PayModal } from "./payWindow";


export const Pay = () => {
	return (
		<div className={mainStyles.main}>
			<div className={mainStyles.back}>
				<Header />
				<PayModal />
			</div>
			<div className={mainStyles.footer}>
			</div>
		</div>

	)
}