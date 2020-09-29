var app = new Vue({
  delimiters: ["<<", ">>"],
  el: "#app",
  data: {
    isOpen: false,
    newsletter: {
      fail: false,
      failReason: "Pokemon are not alive",
      success: false,
    },
  },
});

window.onload = function () {
  function submitNewsletter() {
    const XHR = new XMLHttpRequest();
    const name = document.getElementById("gj-name").value;
    const email = document.getElementById("gj-email").value;

    XHR.addEventListener("load", function () {
      if (XHR.status == 200) {
        app.newsletter.success = true;
      } else {
        app.newsletter.fail = true;
        app.newsletter.failReason = XHR.responseText;
      }
    });
    XHR.addEventListener("error", function () {
      app.newsletter.fail = true;
      app.newsletter.failReason = "Unknown Error";
    });

    XHR.open(
      "POST",
      "https://us-central1-gitjournal-io.cloudfunctions.net/NewsletterAdd"
    );
    XHR.setRequestHeader("Content-Type", "application/json");
    XHR.send(JSON.stringify({ name: name, email: email }));
  }

  const form = document.getElementById("gj-newsletter");
  if (form != null) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      submitNewsletter();
    });
  }

  const caroE = document.getElementById("caro");
  if (caroE != null) {
    const prev = document.getElementById("caro-prev");
    const next = document.getElementById("caro-next");

    const images = [
      "https://gitjournal.io/screenshots/android/2020-09-28/en-GB/images/phoneScreenshots/Nexus 6P-11.png",
      "https://gitjournal.io/screenshots/android/2020-09-28/en-GB/images/phoneScreenshots/Nexus 6P-18.png",
      "https://gitjournal.io/screenshots/android/2020-09-28/en-GB/images/phoneScreenshots/Nexus 6P-19.png",
      "https://gitjournal.io/screenshots/android/2020-09-28/en-GB/images/phoneScreenshots/Nexus 6P-20.png",
    ];

    prev.onclick = function () {
      const caro = $("#caro");
      var src = caro.attr("src");

      var i = images.indexOf(src);
      i--;
      if (i >= images.length) {
        i = 0;
      }
      if (i < 0) {
        i = images.length - 1;
      }

      caro.fadeOut("slow", function () {
        var dup = caro.clone();
        dup.attr("src", images[i]);

        $(this).replaceWith(dup);
        dup.show();
      });
    };
    next.onclick = function () {
      const caro = $("#caro");
      var src = caro.attr("src");

      var i = images.indexOf(src);
      i++;
      if (i >= images.length) {
        i = 0;
      }
      if (i < 0) {
        i = images.length - 1;
      }

      caro.fadeOut("slow", function () {
        var dup = caro.clone();
        dup.attr("src", images[i]);

        $(this).replaceWith(dup);
        dup.show();
      });
    };
  }

  var images2 = [
    "https://gitjournal.io/screenshots/ios/2020-09-28/en-GB/iPhone Xs Max-5.png",
    "https://gitjournal.io/screenshots/ios/2020-09-28/en-GB/iPhone Xs Max-4.png",
    "https://gitjournal.io/screenshots/ios/2020-09-28/en-GB/iPhone Xs Max-6.png",
    "https://gitjournal.io/screenshots/ios/2020-09-28/en-GB/iPhone Xs Max-7.png",
    "https://gitjournal.io/screenshots/ios/2020-09-28/en-GB/iPhone Xs Max-21.png",
  ];
};

function carosel(list, mainId, prevId, nextId) {}
