import { Footer } from './footer';
import { Header } from './header';
import main from './styles/main.module.css';


export const StartPage = () => {
	return (
		<div className={main.main}>
			<div className={main.content}>
				<Header />
				<div className={main.preview}>
					<span className={main.name}>
						STABLE DRAW
					</span>
						<div className={main.aboutUs}>
							<span className={main.aboutUsTxt}>
								Веб-платформа для рисования,
								обработки изображений и создания
								анимаций с применением
								искусственных нейронных сетей
							</span>
						</div>
				</div>
			</div>
			<Footer />
		</div>

	)
}