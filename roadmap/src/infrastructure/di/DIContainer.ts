import { IAdminReview } from "../../application/interfaces/admin/IAdminReview";
import { IGetRequestedRoadmaps } from "../../application/interfaces/admin/IGetRequestedRoadmaps";
import { IStatusChangeUseCase } from "../../application/interfaces/admin/IStatusChangeUseCase";
import { ICreateNodeUseCase } from "../../application/interfaces/ICreateNodeUseCase";
import { IGetAllRoadMaps } from "../../application/interfaces/IGetAllRoadMaps";
import { IGetMyRoadmapByUser } from "../../application/interfaces/IGetMyRoadmapByUser";
import { IGetNodeDetails } from "../../application/interfaces/IGetNodeDetails";
import { IGetRoadMap } from "../../application/interfaces/IGetRoadMap";
import { IRoadMapCreate } from "../../application/interfaces/IRoadmapCreate";
import { ISaveRoadmap } from "../../application/interfaces/ISaveRoadMap";
import { AdminReviewUseCase } from "../../application/usecases/admin/AdminReviewUseCase";
import { GetRequestedRoadmaps } from "../../application/usecases/admin/GetRequestedRoadmaps";
import { StatusChangeUseCase } from "../../application/usecases/admin/StatusChangeUseCase";
import { CreateNodeUseCase } from "../../application/usecases/CreateNodeUseCase";
import { GetListedRoadMaps } from "../../application/usecases/GetListedRoadmaps";
import { GetNodeDetails } from "../../application/usecases/GetNodeDetails";
import { GetRoadMap } from "../../application/usecases/GetRoadMap";
import { GetMyRoadmapByUser } from "../../application/usecases/GetRoadmapByUser";
import { GetAllRoadMaps } from "../../application/usecases/GetRoadMaps";
import { RoadMapCreate } from "../../application/usecases/RoadmapCreate";
import { SaveRoadmap } from "../../application/usecases/SaveRoadMap";
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

    public getAllRoadMapUseCase(): IGetAllRoadMaps {
        return new GetAllRoadMaps(this._roadmapRepositary);
    }
    public getRoadMapUseCases(): IGetRoadMap {
        return new GetRoadMap(this._roadmapRepositary);
    }

    public getSaveRoadmapUseCase(): ISaveRoadmap {
        return new SaveRoadmap(this._roadmapRepositary);
    }

    public getNodeDetailsUseCase(): IGetNodeDetails {
        return new GetNodeDetails(this._roadmapRepositary)
    }

    public getAllListedRoadmaps(): IGetAllRoadMaps {
        return new GetListedRoadMaps(this._roadmapRepositary)
    }

    public getAllDraftedRoadmaps(): IGetRequestedRoadmaps {
        return new GetRequestedRoadmaps(this._roadmapRepositary)
    }

    public roadmapActiveChnage(): IStatusChangeUseCase {
        return new StatusChangeUseCase(this._roadmapRepositary)
    }

    // to fetch all the roadmaps by user
    public fetchUserRoadmaps(): IGetMyRoadmapByUser {
        return new GetMyRoadmapByUser(this._roadmapRepositary)
    }
}