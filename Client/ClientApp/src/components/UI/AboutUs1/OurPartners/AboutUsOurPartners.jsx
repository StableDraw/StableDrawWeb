import React, { useState } from 'react';
import cl from "./OurPartners.module.css";

const AboutUsOurPartners = () => {
    return(
        <div className={`${cl.ourPartners} ${cl.flexBox}`}>
            <h2>
                Наши партнёры
            </h2>
            <div className={`${cl.listPartner} ${cl.flexBox}`}>
                <div className={cl.letfPartner}>
                    <div className={`${cl.itemListPartner} ${cl.flexBox}`}>
                        <img className={cl.itemListPartnerImg} src={"Lambumiz.png"} alt={"Lambumiz"}/>
                        <div className={cl.itemListPartnerText}>
                            <span>Ламбумиз</span>
                        </div>
                    </div>
                    <div className={`${cl.itemListPartner} ${cl.flexBox}`}>
                        <img className={cl.LambumizImg} src={"AniLibria.png"} alt={"AniLibria"}/>
                        <div className={cl.itemListPartnerText}>
                            <span>AniLibria</span>
                        </div>
                    </div>
                </div>
                <div className={cl.rightPartner}>
                    <div className={`${cl.itemListPartner} ${cl.flexBox}`}>
                        <img className={cl.NSTU} src={"NGTU.png"} alt={"NGTU"}/>
                    </div>
                    <div className={`${cl.itemListPartner} ${cl.flexBox}`}>
                        <div className={cl.itemListPartnerText}>
                            <span>DEVOID</span><br></br>
                            <span>Devoid diffusion</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsOurPartners;