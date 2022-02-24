import React, {FC} from 'react';
import './styles.scss';

interface IButton {
    title: string;
    isDisabled?: boolean;
    handler: () => void;
}

const Button: FC<IButton> = ({ title, isDisabled = false, handler }) => {
    return (
        <button onClick={handler} disabled={isDisabled}>{title}</button>
    );
};

export default Button;