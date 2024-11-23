import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { IUpdateUserDataUseCase } from '../../../application/interfaces/user/IUpdateUserDataUseCase';
import crypto from 'crypto';
import { s3Operation } from '../../../infrastructure/service/S3-client';

export class UpdateUserProfileController {
    constructor(private updateUseCase: IUpdateUserDataUseCase) { }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.body;
            let updatedUser;

            if (req.file) {
                // dlt previous avatar if `key` is provided in the body
                if (req.body.key) {
                    await s3Operation.deleteImageFromBucket(req.body.key);
                }
                // for randomm image name suppose two user upload same s3 will overide old image 
                const fileKey = `${userId}/${crypto.randomBytes(16).toString('hex')}-${req.file.originalname}`;
                let uploadResult;
                try {
                    uploadResult = await s3Operation.uploadImageToBucket(
                        req.file.buffer,
                        req.file.mimetype,
                        fileKey
                    );
                } catch (error) {
                    console.log(error,"err with s2")
                }

                // update user profile with the avatar URL
                updatedUser = await this.updateUseCase.execute(userId, { avatar: fileKey });
            } else {
                // update user profile with other fields if no file is present
                updatedUser = await this.updateUseCase.execute(userId, { name: req.body.name });
            }

            // res with updated user profile
            res.status(HttpStatus.OK).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }
}
