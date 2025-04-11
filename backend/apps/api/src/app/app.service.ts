import { createStaticUrlForFile, createUrlForFile } from '@backend/helpers';
import { File } from '@backend/shared/core';
import { UserRdo } from '@backend/shop-user';
import { TrainingRdo } from '@backend/training';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import FormData from 'form-data';
import 'multer';
import { ApplicationServiceURL } from './app.config';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  public async appendUserInfo<T extends { userId: string; userInfo: UserRdo }>(
    records: T[]
  ): Promise<void> {
    const uniqueUserIds = new Set<string>();
    const usersInfo = new Map<string, UserRdo>();

    records.forEach((record) => {
      uniqueUserIds.add(record.userId);
    });

    const userInfos = await Promise.all(
      Array.from(uniqueUserIds).map((userId) =>
        this.httpService.axiosRef.get<UserRdo>(
          `${ApplicationServiceURL.Users}/${userId}`
        )
      )
    );
    userInfos.forEach(({ data }) => {
      data.avatar = createStaticUrlForFile(
        data.avatar,
        ApplicationServiceURL.File
      );
      return usersInfo.set(data.id, data);
    });

    records.forEach((record) => {
      record.userInfo = usersInfo.get(record.userId);
    });
  }

  public async appendTrainingInfo<
    T extends { trainingId: number; training: TrainingRdo }
  >(records: T[]): Promise<void> {
    const uniqueTrainingIds = new Set<number>();
    const trainingsInfo = new Map<number, TrainingRdo>();

    records.forEach((record) => {
      uniqueTrainingIds.add(record.trainingId);
    });

    const trainingInfos = await Promise.all(
      Array.from(uniqueTrainingIds).map((trainingId) =>
        this.httpService.axiosRef.get<TrainingRdo>(
          `${ApplicationServiceURL.Training}/${trainingId}`
        )
      )
    );
    trainingInfos.forEach(({ data }) => {
      data.video = createStaticUrlForFile(
        data.video,
        ApplicationServiceURL.File
      );

      return trainingsInfo.set(data.id, data);
    });

    records.forEach((record) => {
      record.training = trainingsInfo.get(record.trainingId);
    });
  }

  public async uploadFile(file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);
    const { data: fileMetaData } = await this.httpService.axiosRef.post<File>(
      `${ApplicationServiceURL.File}/api/files/upload`,
      formData,
      {
        headers: formData.getHeaders(),
      }
    );
    return createUrlForFile(fileMetaData);
  }
}
