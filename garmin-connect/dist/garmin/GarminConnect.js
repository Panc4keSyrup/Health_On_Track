"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const app_root_path_1 = __importDefault(require("app-root-path"));
const CFClient_1 = __importDefault(require("../common/CFClient"));
const DateUtils_1 = require("../common/DateUtils");
const urls = __importStar(require("./Urls"));
const Urls_1 = require("./Urls");
const Running_1 = __importDefault(require("./workouts/Running"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let config = undefined;
try {
    config = app_root_path_1.default.require('/garmin.config.json');
}
catch (e) {
    // Do nothing
}
var Event;
(function (Event) {
    Event["sessionChange"] = "sessionChange";
})(Event || (exports.Event = Event = {}));
class GarminConnect {
    constructor(credentials = config) {
        const headers = {
            origin: urls.GARMIN_SSO_ORIGIN,
            nk: 'NT'
        };
        this.client = new CFClient_1.default(headers);
        this._userHash = undefined;
        if (!credentials) {
            throw new Error('Missing credentials');
        }
        this.credentials = credentials;
        this.listeners = {};
    }
    get userHash() {
        if (!this._userHash) {
            throw new Error('User not logged in');
        }
        return this._userHash;
    }
    get sessionJson() {
        const cookies = this.client.serializeCookies();
        return { cookies, userHash: this._userHash };
    }
    set sessionJson(json) {
        const { cookies, userHash } = json || {};
        if (cookies && userHash) {
            this._userHash = userHash;
            this.client.importCookies(cookies);
        }
    }
    /**
     * Add an event listener callback
     * @param event
     * @param callback
     */
    on(event, callback) {
        if (event &&
            callback &&
            typeof event === 'string' &&
            typeof callback === 'function') {
            if (!this.listeners[event]) {
                this.listeners[event] = [];
            }
            this.listeners[event].push(callback);
        }
    }
    /**
     * Method for triggering any event
     * @param event
     * @param data
     */
    triggerEvent(event, data) {
        const callbacks = this.listeners[event] || [];
        callbacks.forEach((cb) => cb(data));
    }
    /**
     * Add a callback to the 'sessionChange' event
     * @param callback
     */
    onSessionChange(callback) {
        this.on(Event.sessionChange, callback);
    }
    /**
     * Restore an old session from storage and fallback to regular login
     * @param json
     * @param username
     * @param password
     * @returns {Promise<GarminConnect>}
     */
    async restoreOrLogin(json, username, password) {
        return this.restore(json).catch((e) => {
            console.warn(e);
            return this.login(username, password);
        });
    }
    /**
     * Restore an old session from storage
     * @param json
     * @returns {Promise<GarminConnect>}
     */
    async restore(json) {
        this.sessionJson = json;
        try {
            const info = await this.getUserInfo();
            const { displayName } = info || {};
            if (displayName && displayName === this.userHash) {
                // Session restoration was successful
                return this;
            }
            throw new Error('Unable to restore session, user hash do not match');
        }
        catch (e) {
            throw new Error(`Unable to restore session due to: ${e}`);
        }
    }
    /**
     * Login to Garmin Connect
     * @param username
     * @param password
     * @returns {Promise<*>}
     */
    async login(username, password) {
        if (username && password) {
            this.credentials.username = username;
            this.credentials.password = password;
        }
        let tempCredentials = {
            ...this.credentials,
            rememberme: 'on',
            embed: 'false'
        };
        await this.client.get(urls.SIGNIN_URL);
        await this.client.post(urls.SIGNIN_URL, tempCredentials);
        const userPreferences = await this.getUserInfo();
        const { displayName } = userPreferences;
        this._userHash = displayName;
        return this;
    }
    // User info
    /**
     * Get basic user information
     * @returns {Promise<*>}
     */
    async getUserInfo() {
        return this.get(urls.userInfo());
    }
    /**
     * Get social user information
     * @returns {Promise<*>}
     */
    async getSocialProfile() {
        return this.get(urls.socialProfile(this.userHash));
    }
    /**
     * Get a list of all social connections
     * @returns {Promise<*>}
     */
    async getSocialConnections() {
        return this.get(urls.socialConnections(this.userHash));
    }
    // Devices
    /**
     * Get a list of all registered devices
     * @returns {Promise<*>}
     */
    async getDeviceInfo() {
        return this.get(urls.deviceInfo(this.userHash));
    }
    // Sleep data
    /**
     * Get detailed sleep data for a specific date
     * @param date
     * @returns {Promise<*>}
     */
    async getSleepData(date = new Date()) {
        const dateString = (0, DateUtils_1.toDateString)(date);
        return this.get(urls.dailySleepData(this.userHash), {
            date: dateString
        });
    }
    /**
     * Get sleep data summary for a specific date
     * @param date
     * @returns {Promise<*>}
     */
    async getSleep(date = new Date()) {
        const dateString = (0, DateUtils_1.toDateString)(date);
        return this.get(urls.dailySleep(), { date: dateString });
    }
    // Heart rate
    /**
     * Get heart rate measurements for a specific date
     * @param date
     * @returns {Promise<*>}
     */
    async getHeartRate(date = new Date()) {
        const dateString = (0, DateUtils_1.toDateString)(date);
        return this.get(urls.dailyHeartRate(this.userHash), {
            date: dateString
        });
    }
    // Weight
    /**
     * Post a new body weight
     * @param weight
     * @returns {Promise<*>}
     */
    async setBodyWeight(weight) {
        if (weight) {
            const roundWeight = Math.round(weight * 1000);
            const data = { userData: { weight: roundWeight } };
            return this.put(urls.userSettings(), data);
        }
        return Promise.reject();
    }
    // Activites
    /**
     * Get list of activites
     * @param start
     * @param limit
     * @returns {Promise<*>}
     */
    async getActivities(start, limit) {
        return this.get(urls.activities(), { start, limit });
    }
    /**
     * Get details about an activity
     * @param activityId
     * @returns {Promise<IActivityDetails>}
     */
    async getActivityDetails(activityId) {
        if (activityId) {
            return this.get(urls.activity(activityId));
        }
        return Promise.reject();
    }
    /**
     * Get metrics details about an activity
     * @param activity
     * @param maxChartSize
     * @param maxPolylineSize
     * @returns {Promise<*>}
     */
    async getActivity(activity, maxChartSize, maxPolylineSize) {
        const { activityId } = activity || {};
        if (activityId) {
            return this.get(urls.activityDetails(activityId), {
                maxChartSize,
                maxPolylineSize
            });
        }
        return Promise.reject();
    }
    /**
     * Get weather data from an activity
     * @param activity
     * @returns {Promise<*>}
     */
    async getActivityWeather(activity) {
        const { activityId } = activity || {};
        if (activityId) {
            return this.get(urls.weather(activityId));
        }
        return Promise.reject();
    }
    /**
     * Updates an activity
     * @param activity
     * @returns {Promise<*>}
     */
    async updateActivity(activity) {
        return this.put(urls.activity(activity.activityId), activity);
    }
    /**
     * Deletes an activity
     * @param activity
     * @returns {Promise<*>}
     */
    async deleteActivity(activity) {
        const { activityId } = activity || {};
        if (activityId) {
            const headers = { 'x-http-method-override': 'DELETE' };
            return this.client.postJson(urls.activity(activityId), undefined, headers);
        }
        return Promise.reject();
    }
    /**
     * Get list of activities in your news feed
     * @param start
     * @param limit
     * @returns {Promise<*>}
     */
    async getNewsFeed(start, limit) {
        return this.get(urls.newsFeed(), { start, limit });
    }
    // Steps
    /**
     * Get step count for a specific date
     * @param date
     * @returns {Promise<*>}
     */
    async getSteps(date = new Date()) {
        const dateString = (0, DateUtils_1.toDateString)(date);
        return this.get(urls.dailySummaryChart(this.userHash), {
            date: dateString
        });
    }
    // Workouts
    /**
     * Get list of workouts
     * @param start
     * @param limit
     * @returns {Promise<*>}
     */
    async getWorkouts(start, limit) {
        return this.get(urls.workouts(), { start, limit });
    }
    /**
     * Download original activity data to disk as zip
     * Resolves to absolute path for the downloaded file
     * @param activity : any
     * @param dir Will default to current working directory
     * @param type : string - Will default to 'zip'. Other possible values are 'tcx', 'gpx' or 'kml'.
     * @returns {Promise<*>}
     */
    async downloadOriginalActivityData(activity, dir, type) {
        const { activityId } = activity || {};
        if (activityId) {
            const url = !type || type === Urls_1.ExportFileType.zip
                ? urls.originalFile(activityId)
                : urls.exportFile(activityId, type);
            return this.client.downloadBlob(dir, url);
        }
        return Promise.reject();
    }
    /**
     * Uploads an activity file ('gpx', 'tcx', or 'fit')
     * @param file the file to upload
     * @param format the format of the file. If undefined, the extension of the file will be used.
     * @returns {Promise<*>}
     */
    async uploadActivity(file, format) {
        var _a;
        const detectedFormat = (_a = (format || path_1.default.extname(file))) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        const filename = path_1.default.basename(file);
        if (Object.values(Urls_1.UploadFileType).includes(detectedFormat)) {
            return Promise.reject();
        }
        const fileBuffer = fs_1.default.readFileSync(file);
        const response = this.client.post(urls.upload(format), {
            userfile: {
                value: fileBuffer,
                options: {
                    filename
                }
            }
        });
        return response;
    }
    /**
     * Adds a running workout with one step of completeing a set distance.
     * @param name
     * @param meters
     * @param description
     * @returns {Promise<*>}
     */
    async addRunningWorkout(name, meters, description) {
        const running = new Running_1.default();
        running.name = name;
        running.distance = meters;
        running.description = description;
        return this.addWorkout(running);
    }
    /**
     * Add a new workout preset.
     * @param workout
     * @returns {Promise<*>}
     */
    async addWorkout(workout) {
        if (workout.isValid()) {
            const data = { ...workout.toJson() };
            if (!data.description) {
                data.description = 'Added by garmin-connect for Node.js';
            }
            return this.post(urls.workout(), data);
        }
        return Promise.reject();
    }
    /**
     * Add a workout to your workout calendar.
     * @param workout
     * @param date
     * @returns {Promise<*>}
     */
    async scheduleWorkout(workout, date) {
        const { workoutId } = workout || {};
        if (workoutId && date) {
            const dateString = (0, DateUtils_1.toDateString)(date);
            return this.post(urls.schedule(workoutId), { date: dateString });
        }
        return Promise.reject();
    }
    /**
     * Delete a workout based on a workout object.
     * @param workout
     * @returns {Promise<*>}
     */
    async deleteWorkout(workout) {
        const { workoutId } = workout || {};
        if (workoutId) {
            const headers = { 'x-http-method-override': 'DELETE' };
            return this.client.postJson(urls.workout(workoutId), undefined, headers);
        }
        return Promise.reject();
    }
    // Badges
    /**
     * Get list of earned badges
     * @returns {Promise<*>}
     */
    async getBadgesEarned() {
        return this.get(urls.badgesEarned());
    }
    /**
     * Get list of available badges
     * @returns {Promise<*>}
     */
    async getBadgesAvailable() {
        return this.get(urls.badgesAvailable());
    }
    /**
     * Get details about an badge
     * @param badge
     * @returns {Promise<*>}
     */
    async getBadge(badge) {
        const { badgeId } = badge || {};
        if (badgeId) {
            return this.get(urls.badgeDetail(badgeId));
        }
        return Promise.reject();
    }
    /**
     * Uploads an image to an activity
     * @param activity
     * @param file the file to upload
     * @returns {Promise<*>}
     */
    async uploadImage(activity, file) {
        return this.client.post(urls.image(activity.activityId), {
            file: {
                value: fs_1.default.readFileSync(file),
                options: {
                    filename: path_1.default.basename(file)
                }
            }
        });
    }
    /**
     * Delete an image from an activity
     * @param activity
     * @param imageId, can be found in `activityImages` array of the activity
     * @returns {Promise<void>}
     */
    async deleteImage(activity, imageId) {
        return this.client.delete(urls.imageDelete(activity.activityId, imageId));
    }
    /**
     * List the gear available at a certain date
     * @param userProfilePk, user profile private key (can be found in user or activity details)
     * @param availableGearDate, list gear available at this date only
     * @returns {Promise<Gear[]>}
     */
    async listGear(userProfilePk, availableGearDate) {
        return this.client.get(urls.listGear(userProfilePk, availableGearDate));
    }
    /**
     * Link gear to activity
     * @param activityId, Activity ID
     * @param gearUuid, UUID of the gear
     * @returns {Promise<Gear>}
     */
    async linkGear(activityId, gearUuid) {
        return this.put(urls.linkGear(activityId, gearUuid), {});
    }
    /**
     * Unlink gear to activity
     * @param activityId, Activity ID
     * @param gearUuid, UUID of the gear
     * @returns {Promise<Gear>}
     */
    async unlinkGear(activityId, gearUuid) {
        return this.put(urls.unlinkGear(activityId, gearUuid), {});
    }
    // General methods
    async get(url, data) {
        const response = await this.client.get(url, data);
        this.triggerEvent(Event.sessionChange, this.sessionJson);
        return response;
    }
    async post(url, data) {
        const response = await this.client.postJson(url, data, {});
        this.triggerEvent(Event.sessionChange, this.sessionJson);
        return response;
    }
    async put(url, data) {
        const response = await this.client.putJson(url, data);
        this.triggerEvent(Event.sessionChange, this.sessionJson);
        return response;
    }
}
exports.default = GarminConnect;
//# sourceMappingURL=GarminConnect.js.map