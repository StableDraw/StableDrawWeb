import React from 'react';
import Head from '../order/pay-sayte/header/Head';
import Content from '../order/pay-sayte/content/Content';
import Footer from '../order/pay-sayte/footer/Footer';
import cl from '../order/pay-sayte/Pay.module.css';

const Pay = () => {
    return (
        <div >
           <Head/>
            <header className={cl.mini_header}>
                Premium
            </header>
           <Content/>
           <Footer/>
        </div>
    );
};

export default Pay;