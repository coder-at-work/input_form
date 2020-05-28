import React from 'react';
import './Form.css';

const FormField = ({ title, changeHandler, blurHandler }) => {
    const name = title.replace(/\s/, '').toLowerCase();
    const spanRef = React.createRef();
    return (
        <div className='field_wrapper'>
            <label htmlFor={title} className='input_label'>{title}</label>
            <input name={name} onChange={e => changeHandler(e.target.value, title)} onBlur={event => blurHandler(event, title, spanRef)} />
            <span ref={spanRef} className='error'></span>
        </div>
    )
}

export default FormField;