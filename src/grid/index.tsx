import React, {FC} from 'react';
import Row from "./components/row";
import Cell from "./components/cell";
import './styles.scss';

interface IGrid {
    model: number[][];
}

const Index: FC<IGrid> = ({model}) => {
    const buildGrid = (data: number[][]) => (
        data.map((row: number[], rowInd: number) =>
            <Row key={`row-${rowInd}`}>
                { row.map((col: number, colInd: number) =>
                        <Cell key={`${rowInd}-${colInd}`} isDead={col} />
                )}
            </Row>
        )
    );

    return (
        <div className='grid-wrapper'>
            {buildGrid(model)}
        </div>
    );
};

export default Index;