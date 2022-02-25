export const size = 50;

export const checkCellInGrid = (x: number, y: number, sz: number) => {
    if((x > (sz-1)) || (x < 0)) return false;
    return !(y > (sz-1) || y < 0);
}

export const getCell = (x: number,y: number, data: number[][]) => checkCellInGrid(x, y, size) ? data[x][y] : null;

export const getCellNeighbours = (row: number, col: number, data: number[][]) => {
    const top = getCell(row-1, col, data);
    const bottom = getCell(row+1, col, data);

    const left = getCell(row, col-1, data);
    const right = getCell(row, col+1, data);

    const topLeft = getCell(row-1, col-1, data);
    const topRight = getCell(row-1, col+1, data);

    const bottomLeft = getCell(row+1, col-1, data);
    const bottomRight = getCell(row+1, col+1, data);

    return [
        top,
        bottom,
        left,
        right,
        topLeft,
        topRight,
        bottomLeft,
        bottomRight
    ].filter(item => item !== null);
}

export const shouldUpdateCell = (row: number, col: number, data: number[][]) => {
    const currCellStatus = data[row][col];
    const aliveNeighboursList = getCellNeighbours(row, col, data).filter(item => item === 1);

    if(currCellStatus && (aliveNeighboursList.length < 2) || currCellStatus && (aliveNeighboursList.length > 3)) {
        // 1) Живая клетка, у который меньше двух живых соседних клеток умирает от одиночества.
        // 2) Живая клетка, у которой больше трех живых соседних клеток умирает из-за перенаселённости.
        return true;
    }
    if(!currCellStatus && (aliveNeighboursList.length === 3)) {
        // 3) Мёртвые клетки со строго тремя живыми соседними клетками становятся живыми, будто из-за размножения (оргия из 3х клеток).
        return true;
    }
    // 4) Во всех остальных случаях клетка сохраняет своё состояние в последующем поколении.
    return false
}

export const updateCellsModel = (data: number[][]) => {
    let buff: number[][] = [];

    data.forEach((row: number[], rowInd: number) => {
        buff.push([]);
        row.forEach((col: number, colInd: number) => {
            const shouldUpdate = shouldUpdateCell(rowInd, colInd, data);
            buff[rowInd].push(shouldUpdate ? +(!col) : col);
        })
    })

    return buff;
}
