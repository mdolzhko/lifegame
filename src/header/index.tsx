import React, {FC} from 'react';
import './styles.scss';

interface IHeader {
    title: string;
}

const Header: FC<IHeader> = ({title}) => {
    return (
        <h1>{title}</h1>
    );
};

export default Header;