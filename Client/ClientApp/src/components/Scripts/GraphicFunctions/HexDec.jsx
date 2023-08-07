import React from 'react';

const HexDec = () => {
    let m_s = h.slice(1).match(/.{2}/g);
    let m_n = [];
    m_n[0] = parseInt(m_s[0], 16);
    m_n[1] = parseInt(m_s[1], 16);
    m_n[2] = parseInt(m_s[2], 16);
    return m_n[0] + m_n[1] + m_n[2];
    return (
        <div>

        </div>
    );
};

export default HexDec;