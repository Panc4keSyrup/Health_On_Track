import { GCActivityId, GCBadgeId, GCUserHash, GCWorkoutId } from './types';
export declare const GC_MODERN = "https://connect.garmin.com/modern";
export declare const GARMIN_SSO_ORIGIN = "https://sso.garmin.com";
export declare const GARMIN_SSO: string;
export declare const BASE_URL: string;
export declare const SIGNIN_URL: string;
export declare const LOGIN_URL: string;
export declare const ACTIVITY_SERVICE: string;
export declare const ACTIVITYLIST_SERVICE: string;
export declare const BADGE_SERVICE: string;
export declare const CURRENT_USER_SERVICE: string;
export declare const DEVICE_SERVICE: string;
export declare const DOWNLOAD_SERVICE: string;
export declare const USERPROFILE_SERVICE: string;
export declare const WELLNESS_SERVICE: string;
export declare const WORKOUT_SERVICE: string;
export declare const UPLOAD_SERVICE: string;
export declare const GEAR_SERVICE: string;
export declare const USER_SETTINGS: string;
export declare enum ExportFileType {
    tcx = "tcx",
    gpx = "gpx",
    kml = "kml",
    zip = "zip"
}
export declare enum UploadFileType {
    tcx = "tcx",
    gpx = "gpx",
    fit = "fit"
}
export declare const activity: (id: GCActivityId) => string;
export declare const image: (id: GCActivityId) => string;
export declare const imageDelete: (id: GCActivityId, imageId: string) => string;
export declare const weather: (id: GCActivityId) => string;
export declare const activityDetails: (id: GCActivityId) => string;
export declare const activities: () => string;
export declare const badgesAvailable: () => string;
export declare const badgeDetail: (id: GCBadgeId) => string;
export declare const badgesEarned: () => string;
export declare const dailyHeartRate: (userHash: GCUserHash) => string;
export declare const dailySleep: () => string;
export declare const dailySleepData: (userHash: GCUserHash) => string;
export declare const dailySummaryChart: (userHash: GCUserHash) => string;
export declare const deviceInfo: (userHash: GCUserHash) => string;
export declare const schedule: (id: GCActivityId) => string;
export declare const userInfo: () => string;
export declare const socialProfile: (userHash: GCUserHash) => string;
export declare const userSettings: () => string;
export declare const originalFile: (id: GCActivityId) => string;
/**
 *
 * @param id {string}
 * @param type "tcx" | "gpx" | "kml"
 * @return {`${string}/export/${string}/activity/${string}`}
 */
export declare const exportFile: (id: GCActivityId, type: ExportFileType) => string;
export declare const workout: (id?: GCWorkoutId) => string;
export declare const workouts: () => string;
export declare const socialConnections: (userHash: GCUserHash) => string;
export declare const newsFeed: () => string;
export declare const upload: (format: UploadFileType) => string;
export declare const listGear: (userProfilePk: number, availableGearDate?: Date) => string;
export declare const linkGear: (activityId: GCActivityId, gearUuid: string) => string;
export declare const unlinkGear: (activityId: GCActivityId, gearUuid: string) => string;
