import React, {useEffect, useRef, useState} from 'react';
import {updateCellsModel} from './helpers';
import Button from "../control/button";
import Grid from "../grid";
import './styles.scss';

const size = 50;
const arr = Array.from(Array(size).keys());
const randomInt = () => {
    const ran = Math.random();
    return (
        (ran > .5)
            ? Math.ceil(ran)
            : Math.floor(ran)
    )
}

const initModel = arr.map((item: number, index: number, array: number[]) => array.map( (_) => randomInt()));

const Index = () => {
    const inc = useRef<ReturnType<typeof setInterval> | null>(null);
    const [ticking, setTicking] = useState<number>(0);
    const [start, setStart] = useState<boolean>(false);
    const [cellModel, setCellModel] = useState<number[][]>(initModel);

    useEffect(() => {
        if( start ) {
            inc.current = setInterval(() => {
                setTicking((tic) => tic + 1)
            }, 400);
        }

        return () => {
            clearInterval(inc.current as ReturnType<typeof setInterval>);
        }
    }, [start]);

    useEffect(()=> {
        if( ticking ){
            setCellModel(updateCellsModel(cellModel))
        }
    }, [ticking]);

    // const checkCellInGrid = (x, y, sz) => {
    //     if((x > (sz-1)) || (x < 0)) return false;
    //     return !(y > (sz-1) || y < 0);
    // }
    // const getCell = (x,y) => checkCellInGrid(x, y, size) ? cellModel[x][y] : null;
    // const getCellNeighbours = (row, col) => {
    //     const top = getCell(row-1, col);
    //     const bottom = getCell(row+1, col);
    //
    //     const left = getCell(row, col-1);
    //     const right = getCell(row, col+1);
    //
    //     const topLeft = getCell(row-1, col-1);
    //     const topRight = getCell(row-1, col+1);
    //
    //     const bottomLeft = getCell(row+1, col-1);
    //     const bottomRight = getCell(row+1, col+1);
    //
    //     return [
    //         top,
    //         bottom,
    //         left,
    //         right,
    //         topLeft,
    //         topRight,
    //         bottomLeft,
    //         bottomRight
    //     ].filter(item => item !== null);
    // }
    // const shouldUpdateCell = (row, col, list) => {
    //     const currCellStatus = cellModel[row][col];
    //     const aliveNeighboursList = list(row, col).filter(item => item === 1);
    //
    //     if(currCellStatus && (aliveNeighboursList.length < 2) || currCellStatus && (aliveNeighboursList.length > 3)) {
    //         // 1) Живая клетка, у который меньше двух живых соседних клеток умирает от одиночества.
    //         // 2) Живая клетка, у которой больше трех живых соседних клеток умирает из-за перенаселённости.
    //         return true;
    //     }
    //     if(!currCellStatus && (aliveNeighboursList.length === 3)) {
    //         // 3) Мёртвые клетки со строго тремя живыми соседними клетками становятся живыми, будто из-за размножения (оргия из 3х клеток).
    //         return true;
    //     }
    //     // 4) Во всех остальных случаях клетка сохраняет своё состояние в последующем поколении.
    //     return false
    // }
    // const updateCellsModel = (data) => {
    //     let buff = [];
    //
    //     data.forEach((row, rowInd) => {
    //         buff.push([]);
    //         row.forEach((col, colInd) => {
    //             const shouldUpdate = shouldUpdateCell(rowInd, colInd, getCellNeighbours);
    //             buff[rowInd].push(shouldUpdate ? +(!col) : col);
    //         })
    //     })
    //
    //     return buff;
    // }

    const toggleStart = (): void => setStart(!start);
    const handleStop = (): void => {
        toggleStart();
        clearInterval(inc.current as ReturnType<typeof setInterval>)
    };
    const handleStart = (): void => toggleStart();
    const handleReset = (): void => setCellModel(updateCellsModel(initModel));

    return (
        <>
            <Button title='Start' isDisabled={start} handler={handleStart} />
            <Button title='Stop'  isDisabled={!start} handler={handleStop} />
            <Button title='Reset' handler={handleReset} />

            <Grid model={cellModel} />
        </>
    );
};

export default Index;