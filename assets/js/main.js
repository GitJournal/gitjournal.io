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
    issues: {
      list: [
        {
          num: 137,
          title: "Desktop App",
          votes: 16,
        },
        {
          num: 45,
          title: "Web Version",
          votes: 12,
        },
      ],
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

};

function carosel(images, mainId, prevId, nextId) {
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

function preload(arrayOfImages) {
  $(arrayOfImages).each(function () {
    $("<img />").attr("src", this).appendTo("body").hide();
  });
}
