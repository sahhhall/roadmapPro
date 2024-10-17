import { NodeDetails } from "../../domain/entities/Roadmap";
import { IRoadMapRepository } from "../../domain/interfaces/IRoadMapRepositary";
import { IGetNodeDetails } from "../interfaces/IGetNodeDetails";



export class GetNodeDetails implements IGetNodeDetails {
    constructor(private readonly roadMapRepository: IRoadMapRepository) { }
    async execute(nodeId: string): Promise<NodeDetails | null> {
        const nodeDetails = await this.roadMapRepository.getNodeDetailsByNodeId(nodeId);
        return nodeDetails
    }
}