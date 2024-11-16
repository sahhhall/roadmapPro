import { Publisher, Topics, RoadMapUpdatedEvent } from "@sahhhallroadmappro/common";


export class RoadmapUpdatedProduer extends Publisher<RoadMapUpdatedEvent> {
    topic: Topics.roadmapUpdate = Topics.roadmapUpdate;
}   