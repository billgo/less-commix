const gulp = require("gulp");
const less = require("gulp-less");
const connect = require("gulp-connect");
const rename = require("gulp-rename");
const rimraf = require("rimraf");
const ejs = require("gulp-ejs");
const LessPluginAutoPrefix = require("less-plugin-autoprefix");
const LessPluginInlineUrls = require("less-plugin-inline-urls");
const LessPluginFunctions = require("less-plugin-functions");
const fs = require("fs");

const autoprefixPlugin = new LessPluginAutoPrefix({
  browsers: ["> 5%", "ie >= 8"],
});

const lessDevConfig = {
  plugins: [autoprefixPlugin, LessPluginInlineUrls, new LessPluginFunctions()],
  javascriptEnabled: true,
};

const getVariablesFromLess = (files = []) => {
  const lessVariables = {};
  files.forEach(file => {
    const filePath = `./src/variables/${file}.less`;
    const fileContent = fs.readFileSync(filePath, "utf8");
    const matches = fileContent.match(/@(.+):/g);
    matches.forEach(item => {
      lessVariables[item.replace(/[:@]/g, "")] = true;
    });
  });
  return lessVariables;
};

gulp.task("default", function() {
  const vars = getVariablesFromLess(["color", "fonts", "sizes"]);
  return gulp
    .src("./scripts/extract-vars.less")
    .pipe(
      ejs({
        vars: Object.keys(vars),
      }),
    )
    .pipe(less(lessDevConfig))
    .pipe(gulp.dest("./src"))
    .on("end", function() {
      const cssFile = fs.readFileSync(`./src/extract-vars.css`, "utf8");
      const matches = cssFile.match(/\.(.+) {\n\s+color: (.+)\n}/g);
      const varsArr = [];
      matches.forEach(match => {
        match.replace(/\.(.+) {\n\s+color: (.+);\n}/, (match, $1, $2) => {
          varsArr.push({ key: `@${$1}`, value: $2 });
        });
      });
      gulp
        .src("./scripts/extract-vars.js")
        .pipe(
          ejs({
            vars: varsArr,
          }),
        )
        .pipe(rename(`index.js`))
        .pipe(gulp.dest("./src"))
        .on("end", () => {
          rimraf(`./src/extract-vars.css`, () => {});
        });
    });
});
