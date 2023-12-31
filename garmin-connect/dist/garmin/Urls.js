"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlinkGear = exports.linkGear = exports.listGear = exports.upload = exports.newsFeed = exports.socialConnections = exports.workouts = exports.workout = exports.exportFile = exports.originalFile = exports.userSettings = exports.socialProfile = exports.userInfo = exports.schedule = exports.deviceInfo = exports.dailySummaryChart = exports.dailySleepData = exports.dailySleep = exports.dailyHeartRate = exports.badgesEarned = exports.badgeDetail = exports.badgesAvailable = exports.activities = exports.activityDetails = exports.weather = exports.imageDelete = exports.image = exports.activity = exports.UploadFileType = exports.ExportFileType = exports.USER_SETTINGS = exports.GEAR_SERVICE = exports.UPLOAD_SERVICE = exports.WORKOUT_SERVICE = exports.WELLNESS_SERVICE = exports.USERPROFILE_SERVICE = exports.DOWNLOAD_SERVICE = exports.DEVICE_SERVICE = exports.CURRENT_USER_SERVICE = exports.BADGE_SERVICE = exports.ACTIVITYLIST_SERVICE = exports.ACTIVITY_SERVICE = exports.LOGIN_URL = exports.SIGNIN_URL = exports.BASE_URL = exports.GARMIN_SSO = exports.GARMIN_SSO_ORIGIN = exports.GC_MODERN = void 0;
exports.GC_MODERN = 'https://connect.garmin.com/modern';
exports.GARMIN_SSO_ORIGIN = 'https://sso.garmin.com';
exports.GARMIN_SSO = `${exports.GARMIN_SSO_ORIGIN}/sso`;
exports.BASE_URL = `${exports.GC_MODERN}/proxy`;
exports.SIGNIN_URL = `${exports.GARMIN_SSO}/signin`;
exports.LOGIN_URL = `${exports.GARMIN_SSO}/login`;
exports.ACTIVITY_SERVICE = `${exports.BASE_URL}/activity-service`;
exports.ACTIVITYLIST_SERVICE = `${exports.BASE_URL}/activitylist-service`;
exports.BADGE_SERVICE = `${exports.BASE_URL}/badge-service`;
exports.CURRENT_USER_SERVICE = `${exports.GC_MODERN}/currentuser-service/user/info`;
exports.DEVICE_SERVICE = `${exports.BASE_URL}/device-service`;
exports.DOWNLOAD_SERVICE = `${exports.BASE_URL}/download-service`;
exports.USERPROFILE_SERVICE = `${exports.BASE_URL}/userprofile-service`;
exports.WELLNESS_SERVICE = `${exports.BASE_URL}/wellness-service`;
exports.WORKOUT_SERVICE = `${exports.BASE_URL}/workout-service`;
exports.UPLOAD_SERVICE = `${exports.BASE_URL}/upload-service`;
exports.GEAR_SERVICE = `${exports.BASE_URL}/gear-service`;
exports.USER_SETTINGS = `${exports.USERPROFILE_SERVICE}/userprofile/user-settings/`;
var ExportFileType;
(function (ExportFileType) {
    ExportFileType["tcx"] = "tcx";
    ExportFileType["gpx"] = "gpx";
    ExportFileType["kml"] = "kml";
    ExportFileType["zip"] = "zip";
})(ExportFileType || (exports.ExportFileType = ExportFileType = {}));
var UploadFileType;
(function (UploadFileType) {
    UploadFileType["tcx"] = "tcx";
    UploadFileType["gpx"] = "gpx";
    UploadFileType["fit"] = "fit";
})(UploadFileType || (exports.UploadFileType = UploadFileType = {}));
const activity = (id) => `${exports.ACTIVITY_SERVICE}/activity/${id}`;
exports.activity = activity;
const image = (id) => `${exports.ACTIVITY_SERVICE}/activity/${id}/image`;
exports.image = image;
const imageDelete = (id, imageId) => `${exports.ACTIVITY_SERVICE}/activity/${id}/image/${imageId}`;
exports.imageDelete = imageDelete;
const weather = (id) => `${(0, exports.activity)(id)}/weather`;
exports.weather = weather;
const activityDetails = (id) => `${(0, exports.activity)(id)}/details`;
exports.activityDetails = activityDetails;
const activities = () => `${exports.ACTIVITYLIST_SERVICE}/activities/search/activities`;
exports.activities = activities;
const badgesAvailable = () => `${exports.BADGE_SERVICE}/badge/available`;
exports.badgesAvailable = badgesAvailable;
const badgeDetail = (id) => `${exports.BADGE_SERVICE}/badge/detail/v2/${id}`;
exports.badgeDetail = badgeDetail;
const badgesEarned = () => `${exports.BADGE_SERVICE}/badge/earned`;
exports.badgesEarned = badgesEarned;
const dailyHeartRate = (userHash) => `${exports.WELLNESS_SERVICE}/wellness/dailyHeartRate/${userHash}`;
exports.dailyHeartRate = dailyHeartRate;
const dailySleep = () => `${exports.WELLNESS_SERVICE}/wellness/dailySleep`;
exports.dailySleep = dailySleep;
const dailySleepData = (userHash) => `${exports.WELLNESS_SERVICE}/wellness/dailySleepData/${userHash}`;
exports.dailySleepData = dailySleepData;
const dailySummaryChart = (userHash) => `${exports.WELLNESS_SERVICE}/wellness/dailySummaryChart/${userHash}`;
exports.dailySummaryChart = dailySummaryChart;
const deviceInfo = (userHash) => `${exports.DEVICE_SERVICE}/deviceservice/device-info/all/${userHash}`;
exports.deviceInfo = deviceInfo;
const schedule = (id) => `${exports.WORKOUT_SERVICE}/schedule/${id}`;
exports.schedule = schedule;
const userInfo = () => exports.CURRENT_USER_SERVICE;
exports.userInfo = userInfo;
const socialProfile = (userHash) => `${exports.USERPROFILE_SERVICE}/socialProfile/${userHash}`;
exports.socialProfile = socialProfile;
const userSettings = () => exports.USER_SETTINGS;
exports.userSettings = userSettings;
const originalFile = (id) => `${exports.DOWNLOAD_SERVICE}/files/activity/${id}`;
exports.originalFile = originalFile;
/**
 *
 * @param id {string}
 * @param type "tcx" | "gpx" | "kml"
 * @return {`${string}/export/${string}/activity/${string}`}
 */
const exportFile = (id, type) => `${exports.DOWNLOAD_SERVICE}/export/${type}/activity/${id}`;
exports.exportFile = exportFile;
const workout = (id) => {
    if (id) {
        return `${exports.WORKOUT_SERVICE}/workout/${id}`;
    }
    return `${exports.WORKOUT_SERVICE}/workout`;
};
exports.workout = workout;
const workouts = () => `${exports.WORKOUT_SERVICE}/workouts`;
exports.workouts = workouts;
const socialConnections = (userHash) => `${exports.USERPROFILE_SERVICE}/socialProfile/connections/${userHash}`;
exports.socialConnections = socialConnections;
const newsFeed = () => `${exports.ACTIVITYLIST_SERVICE}/activities/subscriptionFeed`;
exports.newsFeed = newsFeed;
const upload = (format) => `${exports.UPLOAD_SERVICE}/upload/${format}`;
exports.upload = upload;
const listGear = (userProfilePk, availableGearDate) => `${exports.GEAR_SERVICE}/gear/filterGear?userProfilePk=${userProfilePk}${availableGearDate
    ? `&${availableGearDate.getFullYear()}-${availableGearDate.getMonth()}-${availableGearDate.getDay()}`
    : ''}`;
exports.listGear = listGear;
const linkGear = (activityId, gearUuid) => `${exports.GEAR_SERVICE}/gear/link/${gearUuid}/activity/${activityId}`;
exports.linkGear = linkGear;
const unlinkGear = (activityId, gearUuid) => `${exports.GEAR_SERVICE}/gear/unlink/${gearUuid}/activity/${activityId}`;
exports.unlinkGear = unlinkGear;
//# sourceMappingURL=Urls.js.map