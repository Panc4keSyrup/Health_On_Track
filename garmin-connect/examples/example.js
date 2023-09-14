const { GarminConnect } = require('garmin-connect');

const main = async () => {
    const GCClient = new GarminConnect();

    await GCClient.login('bond041688@gmail.com', 'PSyrup30042006&');

    const steps = await GCClient.getSteps(new Date('2023-09-12'));
    const heartRate = await GCClient.getHeartRate(new Date('2023-09-12'));
    var heartRateAvg = heartRate['lastSevenDaysAvgRestingHeartRate'];
    var maxHeartRate = heartRate['maxHeartRate'];
    var minHeartRate = heartRate['minHeartRate'];
    var restingHeartRate = heartRate['restingHeartRate'];
    var totalSteps = 0;

    for (var stepTaken in steps) {
        totalSteps += Number(steps[stepTaken].steps);ư
    }    

    console.log("Total Steps: " + totalSteps);
    console.log("Average Heart Rate: " + heartRateAvg);
    console.log("Max Heart Rate: " + maxHeartRate);
    console.log("Min Heart Rate: " + minHeartRate);
    console.log("Resting Heart Rate: " + restingHeartRate);
};

main();