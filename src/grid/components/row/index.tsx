import React, {FC} from 'react';
import './styles.scss';

interface IRowContainer {
    children: React.ReactNode
}

const Index: FC<IRowContainer> = ({children}) => {
    return (
        <div className='grid-rows'>
            {children}
        </div>
    );
};

export default Index;