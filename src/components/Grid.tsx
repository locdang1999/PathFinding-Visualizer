import { twMerge } from "tailwind-merge";
import { usePathfinding } from "../hooks/usePathfinding"
import { MAX_COLS, MAX_ROWS } from "../utils/constants";
import Tile from "./Tile";
import { MutableRefObject, useState } from "react";
import { checkIfStartOrEnd, createNewGrid } from "../utils/helpers";

const Grid = ({ isVisualizationRunningRef }: { isVisualizationRunningRef: MutableRefObject<boolean>; }) => {
    const { grid, setGrid } = usePathfinding();
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

    const handleMouseDown = (row: number, col: number) => {
        if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
            return;
        }
        setIsMouseDown(true);
        const newGrid = createNewGrid(grid, row, col);
        setGrid(newGrid);
    }

    const handleMouseUp = (row: number, col: number) => {
        if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
            return;
        }

        setIsMouseDown(false);
    }

    const handleMouseEnter = (row: number, col: number) => {
        if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
            return;
        }

        if (isMouseDown) {
            const newGrid = createNewGrid(grid, row, col);
            setGrid(newGrid);
        }
    }

    return (
        <div className={twMerge(
            // Base classes
            "flex items-center flex-col justify-center border-sky-300 mt-10",
            // Control Grid height
            `lg:min-h-[${MAX_ROWS * 17}px] md:min-h-[${MAX_ROWS * 15}px] xs:min-h-[${MAX_ROWS * 8}px] min-h-[${MAX_ROWS * 7}px]`,
            // Controlling grid width
            `lg:w-[${MAX_COLS * 17}px] md:w-[${MAX_COLS * 15}px] xs:w-[${MAX_COLS * 8}px] w-[${MAX_COLS * 7}px]`
        )}>
            {grid.map((row, rowIdx) => (
                <div key={"row-" + rowIdx} className="flex">
                    {row.map((tile, tileIdx) => {
                        const { isEnd, isStart, isPath, isWall, isTraversed } = tile;
                        return (
                            <Tile key={tileIdx}
                                row={tile.row}
                                col={tile.col}
                                isEnd={isEnd}
                                isStart={isStart}
                                isPath={isPath}
                                isTraversed={isTraversed}
                                isWall={isWall}
                                handleMouseDown={() => handleMouseDown(tile.row, tile.col)}
                                handleMouseUp={() => handleMouseUp(tile.row, tile.col)}
                                handleMouseEnter={() => handleMouseEnter(tile.row, tile.col)}
                            />)
                    })}
                </div>
            ))}
        </div>
    )
}

export default Grid