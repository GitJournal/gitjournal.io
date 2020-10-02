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

  buildRevenueGraph("2020", "09");
  buildRevenueGraph("2020", "08");
  buildRevenueGraph("2020", "07");
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

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

async function buildRevenueGraph(year, month) {
  var elem = document.getElementById(`revenue-${year}-${month}`);
  if (elem == null) {
    return;
  }
  var ctx = elem.getContext("2d");
  if (ctx == null) {
    return;
  }

  var labels = [];
  for (var i = 1; i <= daysInMonth(year, month); i++) {
    labels[i - 1] = i;
  }

  var response = await fetch(`/data/revenue/${year}-${month}.json`);
  var data = await response.json();

  var revenue = [];
  var sales = [];
  var monthly = [];
  var yearly = [];

  for (var i = 0; i < data.length; i++) {
    var value = data[i];

    revenue[i] = parseFloat(value.total);
    sales[i] = parseFloat(value.sales);
    monthly[i] = parseFloat(value.subscriptions);
    yearly[i] = parseFloat(value.iap) - parseFloat(value.subscriptions);
  }

  for (var i = 1; i < revenue.length; i++) {
    revenue[i] += revenue[i - 1];
    sales[i] += sales[i - 1];
    monthly[i] += monthly[i - 1];
    yearly[i] += yearly[i - 1];
  }

  const date = new Date(year, month - 1, 1);
  const monthName = date.toLocaleString("default", { month: "long" });

  var total = 0;

  new Chart(ctx, {
    type: "line",
    // The data for our dataset
    data: {
      labels: labels,
      // Information about the dataset
      datasets: [
        {
          label: "Monthly Subs",
          backgroundColor: "#d5d170",
          borderColor: "#aab952",
          data: monthly,
          pointRadius: 0,
        },
        {
          label: "iOS Sales",
          backgroundColor: "#7c9d39",
          borderColor: "#528124",
          fill: "origin",
          data: sales,
          pointRadius: 0,
        },
        {
          label: "Yearly Purchase",
          backgroundColor: "#2D6514",
          borderColor: "#104908",
          data: yearly,
          pointRadius: 0,
        },
        // #528124
        // #2D6514
        // #104908
        // #012D04
      ],
    },

    // Configuration options
    options: {
      responsive: true,
      layout: {
        padding: 10,
      },
      tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
          afterTitle: function () {
            total = 0;
          },
          label: function (tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label;
            var valor =
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            total += valor;
            return label + ": " + valor.toFixed(2) + " €";
          },
          footer: function () {
            return "Total: " + total.toFixed(2) + " €";
          },
        },
      },
      hover: {
        mode: "index",
        intersect: true,
      },
      legend: {
        display: true,
        position: "bottom",
      },
      title: {
        display: true,
        text: `${monthName} ${year}`,
      },
      scales: {
        yAxes: [
          {
            stacked: true,
            scaleLabel: {
              display: false,
            },
            ticks: {
              callback: function (value) {
                return value + " €";
              },
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
            ticks: {
              userCallback: function (item, index) {
                if (!((index + 1) % 5)) return item + "th";
              },
              autoSkip: false,
            },
          },
        ],
      },
    },
  });
}
