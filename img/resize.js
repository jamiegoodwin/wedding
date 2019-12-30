const fs = require("fs");
const rimraf = require("rimraf");
const sharp = require("sharp");
const base = "./full/";
let processed_count = 0;
let images_html = "";

fs.readdir(base, (err, files) => {
  if (err) {
    console.log;
    `Uh oh! ${err}`;
  } else {
    const total_files = files.length;
    files.forEach(file => {
      file = file.replace(".jpg", "");

      // 400s
      rimraf(`400/*`, () => {
        resize(file, 400);
      });

      // 800s
      rimraf(`800/*`, () => {
        resize(file, 800);
      });

      // 1200s
      rimraf(`1200/*`, () => {
        resize(file, 1200);
      });

      // Output HTML for files
      images_html += `<a
                    href="img/1200/${file}.jpg"
                    target="_blank">
                    <picture>
                      <source
                        type="image/webp"
                        srcset="img/400/${file}.webp">
                      <source
                        type="image/webp"
                        media="(min-width: 401px)"
                        srcset="img/800/${file}.webp">
                      <source
                        type="image/webp"
                        media="(min-width: 801px)"
                        srcset="img/1200/${file}.webp">

                      <source
                        type="image/jpeg"
                        media="(min-width: 401px)"
                        srcset="img/400/${file}.jpg">
                      <source
                        type="image/jpeg"
                        media="(min-width: 801px)"
                        srcset="img/800/${file}.jpg">

                      <img src="img/1200/${file}.jpg">
                    </picture>
                  </a>`;

      processed_count++;

      if (processed_count === total_files) {
        save_processed_files();
      }
    });
  }
});

const resize = (file, width) => {
  // WebP version
  sharp(`${base}${file}.jpg`)
    .resize(width)
    .toFormat("webp")
    .toFile(`./${width}/${file}.webp`, (err, info) => {
      if (err) {
        console.log(`Uh oh! Couldn't save output file. ${err}`);
      }
    });

  // JPG backup
  sharp(`${base}${file}.jpg`)
    .resize(width)
    .toFormat("jpg")
    .toFile(`./${width}/${file}.jpg`, (err, info) => {
      if (err) {
        console.log(`Uh oh! Couldn't save output file. ${err}`);
      }
    });
};

const save_processed_files = () => {
  let js = `const images_html = \`${images_html}\``;
  fs.writeFile("processed_files.js", js, written_files);
};

const written_files = () => {
  console.log(`Saved ${processed_count} files.`);
};
