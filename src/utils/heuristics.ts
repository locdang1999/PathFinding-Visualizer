import { MAX_COLS, MAX_ROWS } from "./constants";
import { GridType, TileType } from "./types";

const retrieveHeuristicCost = (currentTile: TileType, endTile: TileType) => {
    const manhattanDistance = 1;
    const row = Math.abs(currentTile.row - endTile.row);
    const col = Math.abs(currentTile.col - endTile.col);

    return manhattanDistance * (row + col);
}

export const initiHeuristicCost = (grid: GridType, endTile: TileType) => {
    const heuristicCosts = [];
    for (let i = 0; i < MAX_ROWS; i++) {
        const row = [];
        for (let j = 0; j < MAX_COLS; j++) {
            row.push(retrieveHeuristicCost(grid[i][j], endTile));
        }
        heuristicCosts.push(row);
    }
    return heuristicCosts;
}

export const initFuncCost = () => {
    const funcCosts = [];
    for (let i = 0; i < MAX_ROWS; i++) {
        const row = [];
        for (let j = 0; j < MAX_COLS; j++) {
            row.push(Infinity);
        }
        funcCosts.push(row);
    }
    return funcCosts;
}
