import React from 'react';
import Head from '../order/pay-sayte/header/Head';
import Content from '../order/agree-sayte/Content';
import Footer from '../order/pay-sayte/footer/Footer';
import cl from '../order/agree-sayte/Agree.module.css';
const agreeWindow = () => {
    return (
        <div className={cl.agreeWindow}>
            {/* <Head/> */}
            <Content/>
            <Footer/>
        </div>
    );
};
export default agreeWindow;