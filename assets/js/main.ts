import $ from "jquery";
import * as Sentry from "@sentry/browser";

window.onload = function () {
  const images = [
    "https://gitjournal.io/screenshots/android/2020-09-28/en-GB/images/phoneScreenshots/Nexus 6P-11.png",
    "https://gitjournal.io/screenshots/android/2020-09-28/en-GB/images/phoneScreenshots/Nexus 6P-18.png",
    "https://gitjournal.io/screenshots/android/2020-09-28/en-GB/images/phoneScreenshots/Nexus 6P-19.png",
    "https://gitjournal.io/screenshots/android/2020-09-28/en-GB/images/phoneScreenshots/Nexus 6P-16.png",
    "https://gitjournal.io/screenshots/android/2020-09-28/en-GB/images/phoneScreenshots/Nexus 6P-20.png",
  ];
  carosel(images, "caro", "caro-prev", "caro-next");

  var images2 = [
    "https://gitjournal.io/screenshots/ios/2020-09-28/en-GB/iPhone Xs Max-5.png",
    "https://gitjournal.io/screenshots/ios/2020-09-28/en-GB/iPhone Xs Max-4.png",
    "https://gitjournal.io/screenshots/ios/2020-09-28/en-GB/iPhone Xs Max-6.png",
    "https://gitjournal.io/screenshots/ios/2020-09-28/en-GB/iPhone Xs Max-7.png",
    "https://gitjournal.io/screenshots/ios/2020-09-28/en-GB/iPhone Xs Max-21.png",
  ];
  carosel(images2, "caro2", "caro-prev2", "caro-next2");

  Sentry.init({
    dsn: "https://e7de932a291e411e9958d1f85841d237@o366485.ingest.sentry.io/5958863",
  });
};

function carosel(
  images: string[],
  mainId: string,
  prevId: string,
  nextId: string
) {
  const caroE = document.getElementById(mainId);
  if (caroE == null) {
    return;
  }
  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);

  prev.onclick = function () {
    const caro = $("#" + mainId);
    var src = caro.attr("src");

    var i = images.indexOf(src);
    i--;
    if (i >= images.length) {
      i = 0;
    }
    if (i < 0) {
      i = images.length - 1;
    }

    var dup = caro.clone();
    dup.attr("src", images[i]);

    caro.fadeOut("fast", function () {
      $(this).replaceWith(dup);
      dup.fadeIn("slow");
    });
  };
  next.onclick = function () {
    const caro = $("#" + mainId);
    var src = caro.attr("src");

    var i = images.indexOf(src);
    i++;
    if (i >= images.length) {
      i = 0;
    }
    if (i < 0) {
      i = images.length - 1;
    }

    var dup = caro.clone();
    dup.attr("src", images[i]);

    caro.fadeOut("fast", function () {
      $(this).replaceWith(dup);
      dup.fadeIn("slow");
    });
  };

  preload(images);
}

function preload(arrayOfImages: string[]) {
  arrayOfImages.forEach((src) => {
    $("<img />").attr("src", src).appendTo("body").hide();
  });
}
