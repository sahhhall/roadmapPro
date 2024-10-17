import mongoose from "mongoose";
import { NodeDetails } from "../../domain/entities/Roadmap";


export interface IGetNodeDetails  {
    execute(nodeId: string): Promise<NodeDetails | null>
}