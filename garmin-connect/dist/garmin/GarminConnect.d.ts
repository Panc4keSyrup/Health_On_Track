import { ExportFileType, UploadFileType } from './Urls';
import { CookieJar } from 'tough-cookie';
import { GCActivityId, GCBadgeId, GCUserHash, Gear, IActivity, IActivityDetails, IBadge, ISocialConnections, ISocialProfile, IUserInfo } from './types';
export type EventCallback<T> = (data: T) => void;
export interface GCCredentials {
    username: string;
    password: string;
}
export interface Listeners {
    [event: string]: EventCallback<any>[];
}
export declare enum Event {
    sessionChange = "sessionChange"
}
export interface Session {
    cookies: CookieJar.Serialized | undefined;
    userHash: string | undefined;
}
export default class GarminConnect {
    private client;
    private _userHash;
    private credentials;
    private listeners;
    constructor(credentials?: GCCredentials | undefined);
    get userHash(): GCUserHash;
    get sessionJson(): Session;
    set sessionJson(json: Session);
    /**
     * Add an event listener callback
     * @param event
     * @param callback
     */
    on<T>(event: Event, callback: EventCallback<T>): void;
    /**
     * Method for triggering any event
     * @param event
     * @param data
     */
    triggerEvent<T>(event: Event, data: T): void;
    /**
     * Add a callback to the 'sessionChange' event
     * @param callback
     */
    onSessionChange(callback: EventCallback<Session>): void;
    /**
     * Restore an old session from storage and fallback to regular login
     * @param json
     * @param username
     * @param password
     * @returns {Promise<GarminConnect>}
     */
    restoreOrLogin(json: Session, username: string, password: string): Promise<GarminConnect | this>;
    /**
     * Restore an old session from storage
     * @param json
     * @returns {Promise<GarminConnect>}
     */
    restore(json: Session): Promise<this>;
    /**
     * Login to Garmin Connect
     * @param username
     * @param password
     * @returns {Promise<*>}
     */
    login(username?: string, password?: string): Promise<GarminConnect>;
    /**
     * Get basic user information
     * @returns {Promise<*>}
     */
    getUserInfo(): Promise<IUserInfo>;
    /**
     * Get social user information
     * @returns {Promise<*>}
     */
    getSocialProfile(): Promise<ISocialProfile>;
    /**
     * Get a list of all social connections
     * @returns {Promise<*>}
     */
    getSocialConnections(): Promise<ISocialConnections>;
    /**
     * Get a list of all registered devices
     * @returns {Promise<*>}
     */
    getDeviceInfo(): Promise<unknown>;
    /**
     * Get detailed sleep data for a specific date
     * @param date
     * @returns {Promise<*>}
     */
    getSleepData(date?: Date): Promise<unknown>;
    /**
     * Get sleep data summary for a specific date
     * @param date
     * @returns {Promise<*>}
     */
    getSleep(date?: Date): Promise<unknown>;
    /**
     * Get heart rate measurements for a specific date
     * @param date
     * @returns {Promise<*>}
     */
    getHeartRate(date?: Date): Promise<unknown>;
    /**
     * Post a new body weight
     * @param weight
     * @returns {Promise<*>}
     */
    setBodyWeight(weight: number): Promise<unknown>;
    /**
     * Get list of activites
     * @param start
     * @param limit
     * @returns {Promise<*>}
     */
    getActivities(start: number, limit: number): Promise<IActivity[]>;
    /**
     * Get details about an activity
     * @param activityId
     * @returns {Promise<IActivityDetails>}
     */
    getActivityDetails(activityId: GCActivityId): Promise<IActivityDetails>;
    /**
     * Get metrics details about an activity
     * @param activity
     * @param maxChartSize
     * @param maxPolylineSize
     * @returns {Promise<*>}
     */
    getActivity(activity: {
        activityId: GCActivityId;
    }, maxChartSize: number, maxPolylineSize: number): Promise<unknown>;
    /**
     * Get weather data from an activity
     * @param activity
     * @returns {Promise<*>}
     */
    getActivityWeather(activity: {
        activityId: GCActivityId;
    }): Promise<unknown>;
    /**
     * Updates an activity
     * @param activity
     * @returns {Promise<*>}
     */
    updateActivity(activity: {
        activityId: GCActivityId;
    }): Promise<unknown>;
    /**
     * Deletes an activity
     * @param activity
     * @returns {Promise<*>}
     */
    deleteActivity(activity: {
        activityId: GCActivityId;
    }): Promise<unknown>;
    /**
     * Get list of activities in your news feed
     * @param start
     * @param limit
     * @returns {Promise<*>}
     */
    getNewsFeed(start: number, limit: number): Promise<unknown>;
    /**
     * Get step count for a specific date
     * @param date
     * @returns {Promise<*>}
     */
    getSteps(date?: Date): Promise<unknown>;
    /**
     * Get list of workouts
     * @param start
     * @param limit
     * @returns {Promise<*>}
     */
    getWorkouts(start: number, limit: number): Promise<unknown>;
    /**
     * Download original activity data to disk as zip
     * Resolves to absolute path for the downloaded file
     * @param activity : any
     * @param dir Will default to current working directory
     * @param type : string - Will default to 'zip'. Other possible values are 'tcx', 'gpx' or 'kml'.
     * @returns {Promise<*>}
     */
    downloadOriginalActivityData(activity: {
        activityId: GCActivityId;
    }, dir: string, type?: ExportFileType): Promise<unknown>;
    /**
     * Uploads an activity file ('gpx', 'tcx', or 'fit')
     * @param file the file to upload
     * @param format the format of the file. If undefined, the extension of the file will be used.
     * @returns {Promise<*>}
     */
    uploadActivity(file: string, format: UploadFileType): Promise<unknown>;
    /**
     * Adds a running workout with one step of completeing a set distance.
     * @param name
     * @param meters
     * @param description
     * @returns {Promise<*>}
     */
    addRunningWorkout(name: string, meters: number, description: string): Promise<unknown>;
    /**
     * Add a new workout preset.
     * @param workout
     * @returns {Promise<*>}
     */
    addWorkout(workout: any): Promise<unknown>;
    /**
     * Add a workout to your workout calendar.
     * @param workout
     * @param date
     * @returns {Promise<*>}
     */
    scheduleWorkout(workout: any, date: Date): Promise<unknown>;
    /**
     * Delete a workout based on a workout object.
     * @param workout
     * @returns {Promise<*>}
     */
    deleteWorkout(workout: any): Promise<unknown>;
    /**
     * Get list of earned badges
     * @returns {Promise<*>}
     */
    getBadgesEarned(): Promise<IBadge[]>;
    /**
     * Get list of available badges
     * @returns {Promise<*>}
     */
    getBadgesAvailable(): Promise<IBadge[]>;
    /**
     * Get details about an badge
     * @param badge
     * @returns {Promise<*>}
     */
    getBadge(badge: {
        badgeId: GCBadgeId;
    }): Promise<unknown>;
    /**
     * Uploads an image to an activity
     * @param activity
     * @param file the file to upload
     * @returns {Promise<*>}
     */
    uploadImage(activity: {
        activityId: GCActivityId;
    }, file: string): Promise<unknown>;
    /**
     * Delete an image from an activity
     * @param activity
     * @param imageId, can be found in `activityImages` array of the activity
     * @returns {Promise<void>}
     */
    deleteImage(activity: {
        activityId: GCActivityId;
    }, imageId: string): Promise<void>;
    /**
     * List the gear available at a certain date
     * @param userProfilePk, user profile private key (can be found in user or activity details)
     * @param availableGearDate, list gear available at this date only
     * @returns {Promise<Gear[]>}
     */
    listGear(userProfilePk: number, availableGearDate?: Date): Promise<Gear[]>;
    /**
     * Link gear to activity
     * @param activityId, Activity ID
     * @param gearUuid, UUID of the gear
     * @returns {Promise<Gear>}
     */
    linkGear(activityId: GCActivityId, gearUuid: string): Promise<Gear>;
    /**
     * Unlink gear to activity
     * @param activityId, Activity ID
     * @param gearUuid, UUID of the gear
     * @returns {Promise<Gear>}
     */
    unlinkGear(activityId: GCActivityId, gearUuid: string): Promise<Gear>;
    get<T>(url: string, data?: any): Promise<T>;
    post<T>(url: string, data: any): Promise<T>;
    put<T>(url: string, data: any): Promise<T>;
}
