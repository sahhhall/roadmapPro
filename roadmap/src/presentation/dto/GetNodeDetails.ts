import { IsString } from "class-validator";


export class GetNodeDetailsDTO {

    @IsString()
    nodeId!: string;
}
