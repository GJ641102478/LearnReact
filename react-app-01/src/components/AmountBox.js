import React from 'react';
import './AmountBoxStyle.css';

const AmountBox = ({text, amount}) => {
    return (
        // <div className="amountBoxClass">{text}</div>
        <div className="amountBoxClass">
            <div className="amountBoxHeader">{text}</div>
            <div className="amountBoxBody">{ amount }</div>
        </div>
    );
}

export default AmountBox;