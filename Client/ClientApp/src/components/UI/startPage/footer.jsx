
import { Logo } from './logo';
import footer from './styles/footer.module.css';

export const Footer = () => {
	return (
		<footer className={footer.main}>
			<div className={footer.infoLeft}>
				<div className={footer.support}>
					<Logo/>
						<span className={footer.supportTxt}>
							support@stabledraw.com
						</span>
				</div>
				<span className={footer.addressTxt}>
						ООО "Стейбл Дроу", 630112, г. Новосибирск, ул. Гоголя, д. 192, кв. 71
					</span>
			</div>
			<div className={footer.infoRight}>
				<span className={footer.txtRight}>
					Пользовательское соглашение
				</span>
				<span className={footer.txtRight}>
					Политика оплаты и возврата
				</span>
			</div>
		</footer>
	)
}