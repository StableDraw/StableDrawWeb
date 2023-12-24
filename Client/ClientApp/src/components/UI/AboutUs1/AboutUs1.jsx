import React, { useState } from 'react';
import cl from "./AboutUs1.module.css";
import { Link } from 'react-router-dom';
import AboutUsFirstScreen from "./FirstScreen/AboutUsFirstScreen";
import AboutUsSecondScreen from "./SecondScreen/AboutUsSecondScreen";
import AboutUsThirdScreen from "./ThirdScreen/AboutUsThirdScreen";
import AboutsUsFourthScreen from "./FourthScreen/AboutUsFourthScreen";
import AboutUsFifthScreen from "./FifthScreen/AboutUsFifthScreen";
import AboutUsOurPartners from "./OurPartners/AboutUsOurPartners";
import AboutUsOurTeam from "./OurTeam/AboutUsOurTeam";
import { ImgLinkObject1 } from "./ImgLinkObject1";
import PhotoSlider from "./PhotoSlider";

const sliderData = [
	{ img: "./assets/images/Paccage1.png" },
	{ img: "./assets/images/Paccage2.png" },
	{ img: "./assets/images/Paccage3.png" },
	{ img: "./assets/images/Paccage4.png" },
	{ img: "./assets/images/Paccage5.png" },
	{ img: "./assets/images/Paccage6.png" },
	{ img: "./assets/images/package1.png" },
	{ img: "./assets/images/package2.png" },
	{ img: "./assets/images/package3.png" },
	{ img: "./assets/images/package4.png" },
	{ img: "./assets/images/package5.png" },
	{ img: "./assets/images/package6.png" }
]

const imgLinks = [
	{ id: 1, href: "https://vk.com/stabledraw", name: "VK", img: '/вк.svg' },
	{ id: 2, href: "https://t.me/StableDraw", name: "Telegram", img: '/telegram.svg' },
	{ id: 3, href: "https://vk.com/stabledraw", name: "Instagram", img: '/instagram.svg' }
]


const AboutUs1 = () => {
	const [isHover, setIsHover] = useState(false);
	const [isRegHover, setRegIsHover] = useState(false);
	const [isEnterHover, setEnterIsHover] = useState(false);
	const handleMouseEnter = () => {
		setIsHover(true)
	}
	const handleMouseLeave = () => {
		setIsHover(false)
	}
	const handleMouseRegEnter = () => {
		setRegIsHover(true)
	}
	const handleMouseRegLeave = () => {
		setRegIsHover(false)
	}
	const handleMouseEnterEnter = () => {
		setEnterIsHover(true)
	}
	const handleMouseEnterLeave = () => {
		setEnterIsHover(false)
	}
	return (
		<div className={cl.background}>
			<div className={cl.background_image}>
				<header className={cl.header}>
					<Link
						className={cl.navka}
						to="/"
					>
						<img
							className={cl.logo}
							src={"лого.png"}
							alt={"logo"}
						/>
					</Link>
					<div className={cl.textLinks}>
						<div className={cl.reg_text}>
							<Link
								to="/"
								style={{
									color: isRegHover ? '#d5b8b8' : '#ffffff',
									cursor: "pointer"
								}}
								onMouseEnter={handleMouseRegEnter}
								onMouseLeave={handleMouseRegLeave}
							>
								Регистрация
							</Link>
						</div>
						<div className={cl.enter_text}>
							<Link
								to="/"
								style={{
									color: isEnterHover ? '#d5b8b8' : '#ffffff',
									cursor: "pointer"
								}}
								onMouseEnter={handleMouseEnterEnter}
								onMouseLeave={handleMouseEnterLeave}
							>
								Вход
							</Link>
						</div>
					</div>
				</header>

				<div className={cl.aboutUs}>
					<AboutUsFirstScreen></AboutUsFirstScreen>
					<AboutUsSecondScreen></AboutUsSecondScreen>
					<AboutUsThirdScreen></AboutUsThirdScreen>
					<AboutsUsFourthScreen></AboutsUsFourthScreen>
					<AboutUsFifthScreen></AboutUsFifthScreen>
					<AboutUsOurPartners></AboutUsOurPartners>
					<AboutUsOurTeam></AboutUsOurTeam>
					<div className={`${cl.achievements} ${cl.flexBox}`}>
						<div className={cl.leftAchivements}>
							<img src="Achievements1.svg" alt="" />
							<img src="Achievements5.svg" alt="" />
							<img src="Achievements6.svg" alt="" />
							<img src="Achievements2.svg" alt="" />
						</div>
						<div className={cl.rightAchivements}>
							<img src="Achievements7.svg" alt="" />
							<img src="Achievements8.svg" alt="" />
							<img src="Achievements4.svg" alt="" />
							<img src="Achievements3.svg" alt="" />
							<p>Достижения StableDraw</p>
						</div>
					</div>
				</div>

				<footer className={cl.footer}>
					<div className={cl.section1}>
						<div className={cl.footer_section1}>
							<div className={cl.footerLogo}>
								<Link
									to="/"
								>
									<div className={cl.footerLogo2}>
										<img src="footerLogo.svg" alt="logo" />
										<span>StableDraw</span>
									</div>
								</Link>
								<div className={cl.email}>
									<a href={'support@stabledraw.com'}>
										support@stabledraw.com
									</a>
								</div>
							</div>
						</div>
						<span>Общество с ограниченной ответственностью "Стейбл Дроу", 630112, г. Новосибирск, ул. Гоголя, д. 192, кв. 71</span>
					</div>
					<div className={cl.footer_section2}>
						<div className={cl.socialContact}>
							<div className={cl.socialBlock}>
								{imgLinks.map(imgLink => <ImgLinkObject1
									href={imgLink.href}
									name={imgLink.name}
									img={imgLink.img}
									key={imgLink.id}
								/>
								)}
							</div>
							<span>+7(913)786-98-87</span>
						</div>
						<div>
							<div className={cl.toptex}>
								<p>Пользовательское соглашение</p>
							</div>
							<div className={cl.downtex}>
								<p>Политика оплаты и возврата</p>
							</div>
							<div className={cl.menuText}>
								<div className={cl.Tex1}>Помощь</div>
								<div className={cl.Tex2}>
									<Link
										to="/AboutUs1"
										style={{ color: isHover ? '#d5b8b8' : '#ffffff', cursor: "pointer" }}
										onMouseEnter={handleMouseEnter}
										onMouseLeave={handleMouseLeave}
									>
										О нас
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className={cl.footerInfoAbout}>
							<div className={cl.footerInfoAboutYur}>
								<span>ИНН/КПП: 5405088796/540501001</span><br></br>
								<span>ОГРН: 123540003826</span><br></br>
								<span>Код ОКВЭД: 62.01 «Разработка компьютерного программного обеспечения»</span>
							</div>
							<span>Языки программирования: C#, Typescript, Python, HTML, CSS</span>
						</div>
				</footer>
			</div>
		</div>
	);
};

export default AboutUs1;