function fPrintMessage(message) {
    let chatData = { content: message, };
    ChatMessage.create(chatData, {})
}

let message = "";
let Choice = "";
let Subject = "";
let Demand = "";
let Action = "";
let Object = "";

// let table = game.tables.getName("Plots - Plot Choice");
let table = await fromUuid("Compendium.ironsworn-custom-oracles.ironsworncustomoracles.RollTable.ZyEC6JjDaLn6fG4i");

let Roll = await table.roll();
Choice = Roll.results[0].data.text;

// table = game.tables.getName("Plots - First Name");
table = await fromUuid("Compendium.ironsworn-custom-oracles.ironsworncustomoracles.RollTable.8flYod7IdN0C5Pw5");
Roll = await table.roll();
Subject = Roll.results[0].data.text;
// table = game.tables.getName("Plots - Last Name");
table = await fromUuid("Compendium.ironsworn-custom-oracles.ironsworncustomoracles.RollTable.hZHeP0Aq9FYWQ0BL");
Roll = await table.roll();
Subject = Subject + " " + Roll.results[0].data.text;
// table = game.tables.getName("Plots - NPC Modifier");
table = await fromUuid("Compendium.ironsworn-custom-oracles.ironsworncustomoracles.RollTable.ML5bfefHPVrXaPMq");
Roll = await table.roll();
Subject = Subject + " (" + Roll.results[0].data.text;
// table = game.tables.getName("Plots - NPC Role");
table = await fromUuid("Compendium.ironsworn-custom-oracles.ironsworncustomoracles.RollTable.r9I5WbSGo4BW6hWN");
Roll = await table.roll();
Subject = Subject + " " + Roll.results[0].data.text + ")";

// table = game.tables.getName("Plots - Demand");
table = await fromUuid("Compendium.ironsworn-custom-oracles.ironsworncustomoracles.RollTable.wGq6oOlOrjVSyXVf");
Roll = await table.roll();
Demand = Roll.results[0].data.text;

if (Choice == "Person") {
    // table = game.tables.getName("Plots - Action vs Person");
    table = await fromUuid("Compendium.ironsworn-custom-oracles.ironsworncustomoracles.RollTable.j5TewCEoidsWvOHz");
    Roll = await table.roll();
    Action = Roll.results[0].data.text;
    // table = game.tables.getName("Plots - First Name");
    table = await fromUuid("Compendium.ironsworn-custom-oracles.ironsworncustomoracles.RollTable.8flYod7IdN0C5Pw5");
    Roll = await table.roll();
    Object = Roll.results[0].data.text;
    // table = game.tables.getName("Plots - Last Name");
    table = await fromUuid("Compendium.ironsworn-custom-oracles.ironsworncustomoracles.RollTable.hZHeP0Aq9FYWQ0BL");
    Roll = await table.roll();
    Object = Object + " " + Roll.results[0].data.text;
    // table = game.tables.getName("Plots - NPC Modifier");
    table = await fromUuid("Compendium.ironsworn-custom-oracles.ironsworncustomoracles.RollTable.ML5bfefHPVrXaPMq");
    Roll = await table.roll();
    Object = Object + " (" + Roll.results[0].data.text;
    // table = game.tables.getName("Plots - NPC Role");
    table = await fromUuid("Compendium.ironsworn-custom-oracles.ironsworncustomoracles.RollTable.r9I5WbSGo4BW6hWN");
    Roll = await table.roll();
    Object = Object + " " + Roll.results[0].data.text + ")";
}

else if (Choice == "Object") {
    // table = game.tables.getName("Plots - Action vs Object");
    table = await fromUuid("Compendium.ironsworn-custom-oracles.ironsworncustomoracles.RollTable.SP8X4aaKNZhMEUco");
    Roll = await table.roll();
    Action = Roll.results[0].data.text + " the";
    // table = game.tables.getName("Plots - Target Object");
    table = await fromUuid("Compendium.ironsworn-custom-oracles.ironsworncustomoracles.RollTable.QIL1ivkyvFfy6GLu");
    Roll = await table.roll();
    Object = Roll.results[0].data.text;
}

else if (Choice == "Group") {
    // table = game.tables.getName("Plots - Action vs Group");
    table = await fromUuid("Compendium.ironsworn-custom-oracles.ironsworncustomoracles.RollTable.LzoSodIXHxOivd26");
    Roll = await table.roll();
    Action = Roll.results[0].data.text;
    // table = game.tables.getName("Plots - Target Group");
    table = await fromUuid("Compendium.ironsworn-custom-oracles.ironsworncustomoracles.RollTable.Q5Qn4ilnOjubIkWm");
    Roll = await table.roll();
    Object = Roll.results[0].data.text;
}

else {
    // table = game.tables.getName("Plots - Action vs Abstract");
    table = await fromUuid("Compendium.ironsworn-custom-oracles.ironsworncustomoracles.RollTable.HR7OGyJtv6WLX1GQ");
    Roll = await table.roll();
    Action = Roll.results[0].data.text;
    // table = game.tables.getName("Plots - Target Abstract");
    table = await fromUuid("Compendium.ironsworn-custom-oracles.ironsworncustomoracles.RollTable.J3deDnBD5NwXNC3g");
    Roll = await table.roll();
    Object = Roll.results[0].data.text;
}

// Print the message

message = "<h3><strong> PLOT </strong></h3>" + Subject + " " + Demand + " " + Action + " " + Object

fPrintMessage(message);