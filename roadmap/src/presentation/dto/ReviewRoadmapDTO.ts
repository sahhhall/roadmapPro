import { IsString, IsIn, MinLength } from 'class-validator';

export class ReviewRoadmapDTO {
    @IsString()
    @MinLength(3)
    adminFeedback!: string;

    @IsIn(['published', 'rejected'])
    status!: 'published' | 'rejected';

    @IsString()
    roadmapId!: string;
}
