import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { IUpdateTestUseCase } from '../../../application/interfaces/admin/IUpdateTestUseCase';
import { MentorApprovedPublisher } from '../../../infrastructure/kafka/producers/mentor-approved-publisher';
import kafkaWrapper from '../../../infrastructure/kafka/kafka-wrapper';
import { Producer } from 'kafkajs';


export class UpdateTestController {
    constructor(private readonly updateTestUseCase: IUpdateTestUseCase) { };

    async updateTest(req: Request, res: Response, next: NextFunction) {
        try {
            const { result, resultFeedback, id } = req.body;
            const updateTest = await this.updateTestUseCase.execute({ result, resultFeedback, id });
            if (result === 'passed') {
                //this should moved after testing
                const stacksMap = new Map([
                    [
                        "mern",
                        [
                            "Node js", "GraphQL", "gRPC", "Microservices",
                            "Kubernetes", "React", "JavaScript", "Docker",
                            "HTML", "CSS", "Next js", "Vue", "Angular", "DSA",
                            "SQL", "NoSQL", "TypeScript"
                        ]
                    ],
                    [
                        "python full stack",
                        [
                            "Django", "HTML", "CSS", "JavaScript", "Next js",
                            "DSA", "GraphQL", "Docker",
                            "Microservices", "gRPC", "Kubernetes", "SQL", "NoSQL"
                        ]
                    ],
                ]);
                function findSkills(name: string) {
                    return stacksMap.get(name.toLowerCase().trim()) || [];
                }
                await new MentorApprovedPublisher(kafkaWrapper.producer as Producer).produce({
                    userId: updateTest?.userId as string,
                    expirience: updateTest?.expirience as string,
                    bio: updateTest?.bio as string,
                    headline: updateTest?.headline as string,
                    languages: updateTest?.languages as string[],
                    githubUrl: updateTest?.githubUrl as string,
                    linkedinUrl: updateTest?.linkedinUrl as string,
                    assessedSkills: findSkills(updateTest?.stackId?.name as string)
                })
            }
            return res.status(HttpStatus.CREATED).json(updateTest)
        } catch (error) {
            next(error)
        }
    }
}