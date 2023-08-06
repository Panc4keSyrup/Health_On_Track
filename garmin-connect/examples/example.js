const { GarminConnect } = require('garmin-connect');

const main = async () => {
    const GCClient = new GarminConnect();

    await GCClient.login('bond041688@gmail.com', 'PSyrup30042006&');

    // Get user info
    const info = await GCClient.getUserInfo();
    const steps = await GCClient.getSteps();
    const heartRate = await GCClient.getHeartRate(new Date('2023-08-02'));
    const sleep = await GCClient.getSleep(new Date('2020-03-24'));
};

main();
