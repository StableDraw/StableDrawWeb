import { Link } from 'react-router-dom';
import { Footer } from './footer';
import { Header } from './header';
import main from './styles/main.module.css';


export const StartPage = () => {
	return (
		<div>
			<div className={main.main}>
				<div className={main.content}>
					<Header />
					<div className={main.preview}>
						<span className={main.name}>
							STABLE DRAW
						</span>
					</div>
					<div className={main.preview1}>
						<div className={main.aboutUs}>
							<span className={main.aboutUsTxt}>
								Веб-платформа для рисования,
								обработки изображений и создания
								анимаций с применением
								искусственных нейронных сетей
							</span>
						</div>
					</div>

					<div className={main.btns}>
						< Link to='/test' className={main.btnFill}>
							<span className={main.txtBlack}>
								Начать
							</span>
						</Link>
						<Link to='/drawing-to-img' className={main.btn}>
							<span className={main.txtWhite}>
								Бета-версия
							</span>
						</Link>
					</div>

				</div>
				<Footer />
			</div>
		</div>
	)
}