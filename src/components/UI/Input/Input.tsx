import React from 'react';
import './Input.css';
import { UseFormRegister } from 'react-hook-form';
import { Inputs } from '@/components/RegisterForm/Form';
interface InputProps {
    icon: React.ReactElement,
    type: string,
    placeHolder: string,
    id: string,
    name: string,
    register: UseFormRegister<Inputs>
}
export const Input = ({icon, type, placeHolder, id, register, name}: InputProps) => {
    return (
        <div className="input-container">
        {icon}
        <input type={type} className="input" placeholder={placeHolder} id={id} {...register(name)}/>
    </div>
    )
}

