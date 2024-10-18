import { IsString, IsIn, MinLength } from 'class-validator';

export class ReviewRoadmapDTO {
    @IsString()
    adminFeedback!: string;

    @IsIn(['published', 'rejected'])
    status!: 'published' | 'rejected';

    @IsString()
    roadmapId!: string;
}
