const fs = require("fs");
const path = require("path");
const R = require("ramda");

const mainPath = "src";
let allElements = {};

const getDirs = (folderPath) => {
  try {
    const dirs = fs.readdirSync(path.join(__dirname, folderPath));
    for (const dir in dirs) {
      const directory = dirs[dir];
      const currentFolderPath = `${folderPath}/${directory}`;

      const isDir = fs
        .statSync(path.join(__dirname, currentFolderPath))
        .isDirectory();

      if (isDir) {
        getDirs(currentFolderPath);
      } else {
        const folder = currentFolderPath.replace(`${mainPath}/`, "");
        const pathArray = folder.split("/");

        pathArray.map((folder, index) => {
          if (index === pathArray.length - 1 && folder.indexOf(".js") > -1) {
            const key = folder.replace(".js", "");

            const fileContent = require(path.join(
              __dirname,
              currentFolderPath
            ));
            const arrayToAllElements = R.assocPath(
              R.slice(0, -1, pathArray),
              { [key]: { ...fileContent } },
              allElements
            );

            const merge = (props) => {
              if (typeof props === "object" && !Array.isArray(props)) {
                return R.mergeDeepWith(props);
              } else {
                return props;
              }
            };

            allElements = R.mergeDeepWith(
              merge,
              allElements,
              arrayToAllElements
            );
          }
        });
      }
    }
  } catch (error) {
    if (error instanceof TypeError) {
        strapi.log.fatal(error);
        process.exit(1);
    }
    console.error(error);
  }
};

// getDirs(mainPath);

// try {
//   if (fs.existsSync("all.json")) {
//     fs.unlinkSync("all.json");
//   }
//   fs.writeFileSync("all.json", JSON.stringify(allElements, null, 2));
// } catch (error) {}

module.exports = { ...allElements };
