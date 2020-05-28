import React, { useEffect, useState, useReducer } from 'react';
import FormField from './FormField';
import './Form.css';

const regexObj = {
    firstname: /[a-zA-Z]+/,
    lastname: /[a-zA-Z]+/,
    email: /\S+@\S+\.\S+/,
    password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/
}

const Form = () => {
    const initialState = {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    }
    const reducer = (state = initialState, action) => {
        const actionType = action.type.replace(/\s/, '').toLowerCase();
        switch (actionType) {
            case 'firstname':
                return {
                    ...state,
                    [actionType]: action.value
                }
            case 'lastname':
                return {
                    ...state,
                    [actionType]: action.value
                }
            case 'email':
                return {
                    ...state,
                    [actionType]: action.value
                }
            case 'password':
                return {
                    ...state,
                    [actionType]: action.value
                }
            default:
                return state;
        }
    }

    const [error, setError] = useState(true);
    const [formData, setFormData] = useState(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        fetch('http://www.mocky.io/v2/5ed00192320000f1aee3d816').then(response => response.json()).then(data => {
            populateRegex(data);
            setFormData(data);
        })
    }, []);

    const populateRegex = (data) => {
        let key;
        data && data.forEach(entry => {
            key = entry.name.replace(/\s/, '').toLowerCase();
            regexObj[key] = (entry.regex && new RegExp(entry.regex)) || regexObj[key];
        })
    }

    const checkForError = (value) => {
        const keys = Object.keys(state);
        let field;
        if (!value) {
            setError(true);
            return;
        }
        for (let i = 0; i < keys.length; i++) {
            field = keys[i];
            if (!state[field].match(regexObj[field])) {
                setError(true);
                return;
            }
        }
        setError(false);
    }

    const onChangeHandler = (value, key) => {
        dispatch({ type: key, value });
        checkForError(value);
    }

    const onBlurHandler = (event, title, ref) => {
        const elementRef = ref.current;
        const key = title && title.replace(/\s/, '').toLowerCase();
        elementRef.innerText = '';
        if (!state[key]) {
            elementRef.innerText = title + ' is required';
            return;
        }
        if (!state[key].match(regexObj[key])) {
            elementRef.innerText = 'Please enter a valid ' + title;
            return;
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <form className='container'>
            <h1 className='title'>Form Validation</h1>
            <div className='form_wrapper'>
                {
                    formData && formData.map((entry, index) => <FormField key={index} title={entry.name} changeHandler={(text, name) => onChangeHandler(text, name)} blurHandler={(event, title, ref) => onBlurHandler(event, title, ref)} />)
                }
            </div>
            <button type="submit" onClick={submitHandler} className='submit_btn' disabled={error}>Submit</button>
        </form>
    )
}

export default React.memo(Form);