import { aStar } from "../lib/algorithm/path_finding/aStar";
import { bfs } from "../lib/algorithm/path_finding/bfs";
import { dfs } from "../lib/algorithm/path_finding/dfs";
import { dijkstra } from "../lib/algorithm/path_finding/dijkstra";
import { Algorithm, GridType, TileType } from "./types"

export const runPathfindingAlgorithm = (
    {
        algorithm,
        grid,
        startTile,
        endTile
    }: {
        algorithm: Algorithm;
        grid: GridType;
        startTile: TileType;
        endTile: TileType
    }) => {
    switch (algorithm) {
        case "BFS":
            return bfs(grid, startTile, endTile);
        case "DFS":
            return dfs(grid, startTile, endTile);
        case "DIJKSTRA":
            return dijkstra(grid, startTile, endTile);
        case "A_STAR":
            return aStar(grid, startTile, endTile);
        default:
            return bfs(grid, startTile, endTile);
    }
}

