import React, {FC} from 'react';

interface ICell {
    isDead: number; // 0 | 1;
}

const Index: FC<ICell> = ({isDead}) => {
    return (
        <div className={`${isDead === 1 ? 'active' : ''}`}/>
    );
};

export default Index;