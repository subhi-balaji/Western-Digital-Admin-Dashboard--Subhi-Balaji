import _ from "underscore";

const mainProcesses = [
  "NanoNTDevelopment.exe;",
  "Spotfire.Dxp.exe",
  "Spotfire.Dxp.Cef.SubProcess.exe",
  "PyScriptEditor.exe",
  "300ETEST.exe",
  "CNE_GUI.exe",
  "BICS6-D4-4P.exe",
  "Script.exe",
];

// export function findProcesses(Executables) {
//   const lowerCaseExecutables = Executables.map((item) => item.toLowerCase());
//   const lowerCaseMainProcesses = mainProcesses.map((item) => item.toLowerCase());
//   return ujs.intersection(mainProcesses, Executables);
// }

//BICS6-D4-4P.exe
//  "Script.exe",

export function findProcesses(Executables) {
  const data = _.filter(Executables, function (exe) {
    return (
      // exe["name"].includes("Script.exe") ||
      // exe["name"].includes("BICS6-D4-4P.exe") ||
      // exe["name"].includes("PyScriptEditor.exe") ||
      // exe["name"].includes("Spotfire.Dxp.Cef.SubProcess.exe") ||
      // exe["name"].includes("Spotfire.Dxp.exe") ||
      // exe["name"].includes("NanoNTDevelopment.exe;")
      exe["name"].includes("Script") ||
      exe["name"].includes("BIC") ||
      exe["name"].includes("300ETEST") ||
      exe["name"].includes("CNE_GUI") ||
      exe["name"].includes("PyScript") ||
      exe["name"].includes("Spotfire") ||
      exe["name"].includes("NanoNTD")
      // Add more searches here and search by .exe filename expected.
    );
  });

  return data;
}
