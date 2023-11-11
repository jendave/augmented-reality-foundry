// Macro by David Hudson under the MIT License.

function printMessage(message) {
    let chatData = { content: message, };
    ChatMessage.create(chatData, {})
};

try {
    let numberOfBuildingsDialog = await Dialog.prompt({
        title: "Number of Downtown Buildings",
        content: `<p>Enter Number of Downtown Buildings:</p><input type="number" id="modifier" name="modifier" min="0" max="99" value="4"/>`,
        rejectClose: true,
        callback: (html) => html.find('input').val()
    });

    let rollTablesUUIDPrefix = "Compendium.augmented-reality-foundry.augmentedrealityrolltables.RollTable.";

    let numberOfBuildings = parseInt(numberOfBuildingsDialog);

    let title = "<h3><strong>Downtown Buildings</strong></h3>";
    let message = "Building - Floors<br>";
    let buildingTypeTable = await fromUuid(rollTablesUUIDPrefix + "RAhL2yZlsv1q7AKS");
    let buildingTypeRoll = "";
    let buildingType = "";

    let expandedFeatureTable = await fromUuid(rollTablesUUIDPrefix + "iStOB87CjnxOE7aw");
    let expandedFeatureRoll = "";
    let expandedFeature = "";

    message += buildingType;

    for (let i = 1; i <= numberOfBuildings; i++) {
        buildingTypeRoll = await buildingTypeTable.roll();
        buildingType = buildingTypeRoll.results[0].text;
        expandedFeatureRoll = await expandedFeatureTable.roll();
        expandedFeature = expandedFeatureRoll.results[0].text;
        message += i + ". ";
        message += buildingType + "<br>";
        message += "-   " + expandedFeature + "<br>";
    }

    /*
    table = await fromUuid(rollTablesUUIDPrefix + "5UVnxCiXJYMzyX01");
    roll = await table.roll();
    let features1 = roll.results[0].text;
    
    table = await fromUuid(rollTablesUUIDPrefix + "NzWJIe6KyLfRjTh4");
    roll = await table.roll();
    let features2 = roll.results[0].text;
    
    table = await fromUuid(rollTablesUUIDPrefix + "iStOB87CjnxOE7aw");
    roll = await table.roll();
    let expandedFeature = roll.results[0].text;
    */

    // Print the message
    printMessage(title + message);

}
catch (e) {
    console.log(e);
}
