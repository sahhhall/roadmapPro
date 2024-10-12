import { IAdminReview } from "../../application/interfaces/admin/IAdminReview";
import { ICreateNodeUseCase } from "../../application/interfaces/ICreateNodeUseCase";
import { IRoadMapCreate } from "../../application/interfaces/IRoadmapCreate";
import { AdminReviewUseCase } from "../../application/usecases/admin/AdminReviewUseCase";
import { CreateNodeUseCase } from "../../application/usecases/CreateNodeUseCase";
import { RoadMapCreate } from "../../application/usecases/RoadmapCreate";
import { RoadMapRepository } from "../repositories/RoadMapRepositary";




export class DIContainer {
    private static instance: DIContainer;
    private _roadmapRepositary: RoadMapRepository;

    private constructor() {
        this._roadmapRepositary = new RoadMapRepository;
    }
    public static getInstance(): DIContainer {
        if (!DIContainer.instance) {
            DIContainer.instance = new DIContainer()
        }
        return DIContainer.instance;
    }

    public getCreateRoadMapUseCase(): IRoadMapCreate {
        return new RoadMapCreate(this._roadmapRepositary)
    };

    public getCreateNodeCreateUseCase(): ICreateNodeUseCase {
        return new CreateNodeUseCase(this._roadmapRepositary)
    }

    public getReviewRoadMapUseCase(): IAdminReview {
        return new AdminReviewUseCase(this._roadmapRepositary);
    }
}