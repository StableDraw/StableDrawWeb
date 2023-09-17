import modalStyles from './styles/payModal.module.css'

export const Premium = () => {
	return(
		<div className={modalStyles.premium}>
				<div className={modalStyles.premiumTxt}>
					<span>
						Premium
					</span>
				</div>
				<svg className={modalStyles.premiumIcon} xmlns='../../../../../public/Pay/stars.svg' width="35" height="35" viewBox="0 0 35 35" fill="none">
					<g clip-path="url(#clip0_41_10)">
						<path d="M17.4853 2.91667C9.43525 2.91667 2.9165 9.45 2.9165 17.5C2.9165 25.55 9.43525 32.0833 17.4853 32.0833C25.5498 32.0833 32.0832 25.55 32.0832 17.5C32.0832 9.45 25.5498 2.91667 17.4853 2.91667ZM22.1957 25.3604L17.4998 22.5312L12.804 25.3604C12.2498 25.6958 11.5644 25.2 11.7103 24.5729L12.9498 19.2354L8.82275 15.6625C8.3415 15.2396 8.604 14.4375 9.24567 14.3792L14.6998 13.9125L16.829 8.88125C17.0769 8.28333 17.9228 8.28333 18.1707 8.88125L20.2998 13.8979L25.754 14.3646C26.3957 14.4229 26.6582 15.225 26.1623 15.6479L22.0353 19.2208L23.2748 24.5729C23.4207 25.2 22.7498 25.6958 22.1957 25.3604Z" fill="url(#paint0_linear_41_10)" />
					</g>
					<defs>
						<linearGradient id="paint0_linear_41_10" x1="-3.5" y1="17" x2="83" y2="17" gradientUnits="userSpaceOnUse">
							<stop stop-color="#B6038D" />
							<stop offset="1" stop-color="#4201BF" />
						</linearGradient>
						<clipPath id="clip0_41_10">
							<rect width="35" height="35" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</div>
	);
}