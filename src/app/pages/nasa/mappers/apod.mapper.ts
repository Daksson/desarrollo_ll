import {ApodResponse} from '../interfaces/apod-response.interface';
import {Apod} from '../interfaces/apod.interface';

export class ApodMapper {
    static mapApodResponseToApod(apodResponse: ApodResponse): Apod {
        return {
            date: apodResponse.date,
            title: apodResponse.title,
            explanation: apodResponse.explanation,
            imageUrl: apodResponse.url,
            hdImageUrl: apodResponse.hdurl,
            mediaType: apodResponse.media_type,
        };
    }
}