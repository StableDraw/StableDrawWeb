
import { Logo } from './logo';
import footer from './styles/footer.module.css';

export const Footer = () => {
	return (
		<footer className={footer.main}>
			<div className={footer.infoLeft}>
				<div className={footer.support}>
					<Logo />
					<span className={footer.supportTxt}>
						support@stabledraw.com
					</span>
					<div className={footer.media}>
						<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
							<rect x="0.5" y="0.5" width="44" height="44" rx="22" fill="black" stroke="white" />
							<path d="M23.6053 30.375C15.1492 30.375 10.326 24.4628 10.125 14.625H14.3608C14.4999 21.8457 17.6227 24.9043 20.0961 25.5349V14.625H24.0846V20.8525C26.5271 20.5845 29.0933 17.7466 29.959 14.625H33.9475C33.6212 16.244 32.971 17.7769 32.0373 19.1278C31.1036 20.4788 29.9067 21.6187 28.5213 22.4764C30.0677 23.26 31.4336 24.3692 32.5288 25.7307C33.624 27.0922 34.4237 28.6752 34.875 30.375H30.4846C30.0795 28.8986 29.2561 27.5769 28.1176 26.5757C26.9791 25.5744 25.5761 24.9382 24.0846 24.7466V30.375H23.6053Z" fill="white" />
						</svg>
					</div>
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