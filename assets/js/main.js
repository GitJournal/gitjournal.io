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

  foo();
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

function foo() {
  console.log("FOOO");
  var ctx = document.getElementById("myChart").getContext("2d");
  if (ctx == null) {
    return;
  }

  var labels = [];
  for (var i = 1; i <= 30; i++) {
    labels[i - 1] = i;
  }

  var data = {
    "2020-09-01": {
      sales: "2.71",
      iap: "8.31",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "11.02",
      gross_sales: "4.49",
      gross_iap: "11.89",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "16.38",
      subscriptions: "8.31",
      gross_subscriptions: "11.89",
      date: "2020-09-01",
    },
    "2020-09-02": {
      sales: "2.35",
      iap: "0.00",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "2.35",
      gross_sales: "3.35",
      gross_iap: "0.00",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "3.35",
      subscriptions: "0.00",
      gross_subscriptions: "0.00",
      date: "2020-09-02",
    },
    "2020-09-03": {
      sales: "0.00",
      iap: "21.05",
      returns: "4.02",
      edu: "0.00",
      ads: "0.00",
      total: "17.03",
      gross_sales: "0.00",
      gross_iap: "30.08",
      gross_edu: "0.00",
      gross_returns: "6.49",
      gross_total: "30.08",
      subscriptions: "3.33",
      gross_subscriptions: "4.77",
      date: "2020-09-03",
    },
    "2020-09-04": {
      sales: "0.00",
      iap: "21.64",
      returns: "1.18",
      edu: "0.00",
      ads: "0.00",
      total: "20.46",
      gross_sales: "0.00",
      gross_iap: "31.41",
      gross_edu: "0.00",
      gross_returns: "1.68",
      gross_total: "31.41",
      subscriptions: "4.10",
      gross_subscriptions: "6.35",
      date: "2020-09-04",
    },
    "2020-09-05": {
      sales: "7.55",
      iap: "3.59",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "11.14",
      gross_sales: "12.32",
      gross_iap: "6.30",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "18.62",
      subscriptions: "3.59",
      gross_subscriptions: "6.30",
      date: "2020-09-05",
    },
    "2020-09-06": {
      sales: "7.48",
      iap: "18.03",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "25.50",
      gross_sales: "12.35",
      gross_iap: "25.76",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "38.11",
      subscriptions: "1.04",
      gross_subscriptions: "1.48",
      date: "2020-09-06",
    },
    "2020-09-07": {
      sales: "2.73",
      iap: "23.89",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "26.62",
      gross_sales: "3.89",
      gross_iap: "34.14",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "38.03",
      subscriptions: "6.16",
      gross_subscriptions: "8.80",
      date: "2020-09-07",
    },
    "2020-09-08": {
      sales: "4.94",
      iap: "1.30",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "6.24",
      gross_sales: "7.82",
      gross_iap: "1.86",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "9.68",
      subscriptions: "1.30",
      gross_subscriptions: "1.86",
      date: "2020-09-08",
    },
    "2020-09-09": {
      sales: "1.94",
      iap: "0.89",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "2.83",
      gross_sales: "3.33",
      gross_iap: "1.27",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "4.61",
      subscriptions: "0.89",
      gross_subscriptions: "1.27",
      date: "2020-09-09",
    },
    "2020-09-10": {
      sales: "0.00",
      iap: "5.08",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "5.08",
      gross_sales: "0.00",
      gross_iap: "7.25",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "7.25",
      subscriptions: "5.08",
      gross_subscriptions: "7.25",
      date: "2020-09-10",
    },
    "2020-09-11": {
      sales: "2.37",
      iap: "0.00",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "2.37",
      gross_sales: "3.37",
      gross_iap: "0.00",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "3.37",
      subscriptions: "0.00",
      gross_subscriptions: "0.00",
      date: "2020-09-11",
    },
    "2020-09-12": {
      sales: "0.00",
      iap: "13.97",
      returns: "2.50",
      edu: "0.00",
      ads: "0.00",
      total: "11.47",
      gross_sales: "0.00",
      gross_iap: "19.99",
      gross_edu: "0.00",
      gross_returns: "4.31",
      gross_total: "19.99",
      subscriptions: "13.97",
      gross_subscriptions: "19.99",
      date: "2020-09-12",
    },
    "2020-09-13": {
      sales: "2.70",
      iap: "0.88",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "3.58",
      gross_sales: "4.82",
      gross_iap: "1.27",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "6.08",
      subscriptions: "0.88",
      gross_subscriptions: "1.27",
      date: "2020-09-13",
    },
    "2020-09-14": {
      sales: "2.36",
      iap: "4.41",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "6.77",
      gross_sales: "3.37",
      gross_iap: "6.31",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "9.68",
      subscriptions: "4.41",
      gross_subscriptions: "6.31",
      date: "2020-09-14",
    },
    "2020-09-15": {
      sales: "0.00",
      iap: "3.04",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "3.04",
      gross_sales: "0.00",
      gross_iap: "4.35",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "4.35",
      subscriptions: "3.04",
      gross_subscriptions: "4.35",
      date: "2020-09-15",
    },
    "2020-09-16": {
      sales: "2.36",
      iap: "5.53",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "7.90",
      gross_sales: "3.37",
      gross_iap: "7.91",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "11.28",
      subscriptions: "5.53",
      gross_subscriptions: "7.91",
      date: "2020-09-16",
    },
    "2020-09-17": {
      sales: "6.95",
      iap: "4.61",
      returns: "1.18",
      edu: "0.00",
      ads: "0.00",
      total: "10.38",
      gross_sales: "10.19",
      gross_iap: "6.61",
      gross_edu: "0.00",
      gross_returns: "1.69",
      gross_total: "16.80",
      subscriptions: "4.61",
      gross_subscriptions: "6.61",
      date: "2020-09-17",
    },
    "2020-09-18": {
      sales: "0.00",
      iap: "52.41",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "52.41",
      gross_sales: "0.00",
      gross_iap: "75.43",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "75.43",
      subscriptions: "3.77",
      gross_subscriptions: "5.94",
      date: "2020-09-18",
    },
    "2020-09-19": {
      sales: "4.73",
      iap: "4.83",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "9.56",
      gross_sales: "6.74",
      gross_iap: "6.92",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "13.66",
      subscriptions: "4.83",
      gross_subscriptions: "6.92",
      date: "2020-09-19",
    },
    "2020-09-20": {
      sales: "5.07",
      iap: "19.31",
      returns: "2.65",
      edu: "0.00",
      ads: "0.00",
      total: "21.73",
      gross_sales: "7.86",
      gross_iap: "27.60",
      gross_edu: "0.00",
      gross_returns: "3.79",
      gross_total: "35.46",
      subscriptions: "2.14",
      gross_subscriptions: "3.07",
      date: "2020-09-20",
    },
    "2020-09-21": {
      sales: "0.00",
      iap: "40.04",
      returns: "23.04",
      edu: "0.00",
      ads: "0.00",
      total: "17.00",
      gross_sales: "0.00",
      gross_iap: "57.20",
      gross_edu: "0.00",
      gross_returns: "32.91",
      gross_total: "57.20",
      subscriptions: "2.07",
      gross_subscriptions: "2.95",
      date: "2020-09-21",
    },
    "2020-09-22": {
      sales: "2.38",
      iap: "31.04",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "33.42",
      gross_sales: "3.39",
      gross_iap: "44.69",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "48.08",
      subscriptions: "31.04",
      gross_subscriptions: "44.69",
      date: "2020-09-22",
    },
    "2020-09-23": {
      sales: "4.35",
      iap: "2.54",
      returns: "2.39",
      edu: "0.00",
      ads: "0.00",
      total: "4.50",
      gross_sales: "6.77",
      gross_iap: "3.65",
      gross_edu: "0.00",
      gross_returns: "3.41",
      gross_total: "10.42",
      subscriptions: "2.54",
      gross_subscriptions: "3.65",
      date: "2020-09-23",
    },
    "2020-09-24": {
      sales: "8.02",
      iap: "0.96",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "8.98",
      gross_sales: "12.83",
      gross_iap: "1.84",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "14.67",
      subscriptions: "0.96",
      gross_subscriptions: "1.84",
      date: "2020-09-24",
    },
    "2020-09-25": {
      sales: "4.80",
      iap: "2.32",
      returns: "2.77",
      edu: "0.00",
      ads: "0.00",
      total: "4.35",
      gross_sales: "6.83",
      gross_iap: "3.34",
      gross_edu: "0.00",
      gross_returns: "3.96",
      gross_total: "10.18",
      subscriptions: "2.32",
      gross_subscriptions: "3.34",
      date: "2020-09-25",
    },
    "2020-09-26": {
      sales: "9.82",
      iap: "3.72",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "13.54",
      gross_sales: "14.83",
      gross_iap: "5.68",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "20.52",
      subscriptions: "3.72",
      gross_subscriptions: "5.68",
      date: "2020-09-26",
    },
    "2020-09-27": {
      sales: "4.81",
      iap: "18.70",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "23.51",
      gross_sales: "6.86",
      gross_iap: "26.70",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "33.56",
      subscriptions: "1.20",
      gross_subscriptions: "1.71",
      date: "2020-09-27",
    },
    "2020-09-28": {
      sales: "0.00",
      iap: "0.00",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "0.00",
      gross_sales: "0.00",
      gross_iap: "0.00",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "0.00",
      subscriptions: "0.00",
      gross_subscriptions: "0.00",
      date: "2020-09-28",
    },
    "2020-09-29": {
      sales: "9.49",
      iap: "24.63",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "34.12",
      gross_sales: "13.68",
      gross_iap: "35.20",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "48.88",
      subscriptions: "6.66",
      gross_subscriptions: "9.52",
      date: "2020-09-29",
    },
    "2020-09-30": {
      sales: "0.00",
      iap: "30.82",
      returns: "0.00",
      edu: "0.00",
      ads: "0.00",
      total: "30.82",
      gross_sales: "0.00",
      gross_iap: "44.07",
      gross_edu: "0.00",
      gross_returns: "0.00",
      gross_total: "44.07",
      subscriptions: "12.95",
      gross_subscriptions: "18.53",
      date: "2020-09-30",
    },
  };

  var revenue = [];
  var sales = [];
  var monthly = [];
  var yearly = [];

  var i = 0;
  for (const [key, value] of Object.entries(data)) {
    revenue[i] = parseFloat(value.total);
    sales[i] = parseFloat(value.sales);
    monthly[i] = parseFloat(value.subscriptions);
    yearly[i] = parseFloat(value.iap) - parseFloat(value.subscriptions);

    /*
    var total = sales[i] + monthly[i] + yearly[i];
    if (total.toFixed(2) != revenue[i].toFixed(2)) {
      console.log(key);
      console.log("Revenue: " + revenue[i]);
      console.log("sales: " + sales[i]);
      console.log("monthly: " + monthly[i]);
      console.log("yearly: " + yearly[i]);
      console.log("Total: ", sales[i] + monthly[i] + yearly[i]);
      console.log(value);
      console.log("-------");
    }
    */
    i++;
  }

  for (var i = 1; i < revenue.length; i++) {
    revenue[i] += revenue[i - 1];
    sales[i] += sales[i - 1];
    monthly[i] += monthly[i - 1];
    yearly[i] += yearly[i - 1];
  }
  revenue = revenue.map((r) => r.toFixed(2));
  sales = sales.map((r) => r.toFixed(2));
  monthly = monthly.map((r) => r.toFixed(2));
  yearly = yearly.map((r) => r.toFixed(2));

  var chart = new Chart(ctx, {
    type: "line", // also try bar or other graph types
    // The data for our dataset
    data: {
      labels: labels,
      // Information about the dataset
      datasets: [
        /*
        {
          label: "Revenue",
          backgroundColor: "lightblue",
          borderColor: "royalblue",
          data: revenue,
          fill: "origin",
          pointRadius: 0,
        },*/

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
        /*
        custom: function (tooltipModel) {
          // Tooltip Element
          var tooltipEl = document.getElementById("chartjs-tooltip");

          // Create element on first render
          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "chartjs-tooltip";
            tooltipEl.innerHTML = "<table></table>";
            document.body.appendChild(tooltipEl);
          }

          // Hide if no tooltip
          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
          }

          // Set caret Position
          tooltipEl.classList.remove("above", "below", "no-transform");
          if (tooltipModel.yAlign) {
            tooltipEl.classList.add(tooltipModel.yAlign);
          } else {
            tooltipEl.classList.add("no-transform");
          }

          function getBody(bodyItem) {
            return bodyItem.lines;
          }

          // Set Text
          if (tooltipModel.body) {
            var titleLines = tooltipModel.title || [];
            var bodyLines = tooltipModel.body.map(getBody);

            var innerHtml = "<thead>";

            titleLines.forEach(function (title) {
              innerHtml += "<tr><th>" + title + "</th></tr>";
            });
            innerHtml += "</thead><tbody>";

            var sum = 0;
            bodyLines.forEach(function (body) {
              var num = body[0].split(":")[1];
              sum += parseFloat(num);
            });
            sum = "Total: " + sum.toFixed(2);

            innerHtml += "<tr><td>" + sum + "</td></tr>";
            bodyLines.forEach(function (body, i) {
              var colors = tooltipModel.labelColors[i];
              var style = "background:" + colors.backgroundColor;
              style += "; border-color:" + colors.borderColor;
              style += "; border-width: 2px";
              var span = '<span style="' + style + '"></span>';
              innerHtml += "<tr><td>" + span + body + "</td></tr>";
            });
            innerHtml += "</tbody>";

            var tableRoot = tooltipEl.querySelector("table");
            tableRoot.innerHTML = innerHtml;
          }

          // `this` will be the overall tooltip
          var position = this._chart.canvas.getBoundingClientRect();

          // Display, position, and set styles for font
          tooltipEl.style.opacity = 1;
          tooltipEl.style.position = "absolute";
          tooltipEl.style.left =
            position.left + window.pageXOffset + tooltipModel.caretX + "px";
          tooltipEl.style.top =
            position.top + window.pageYOffset + tooltipModel.caretY + "px";
          tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
          tooltipEl.style.fontSize = tooltipModel.bodyFontSize + "px";
          tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
          tooltipEl.style.padding =
            tooltipModel.yPadding + "px " + tooltipModel.xPadding + "px";
          tooltipEl.style.pointerEvents = "none";
        },
      */
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
        text: "Revenue",
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
            scaleLabel: {
              display: true,
              labelString: "September",
            },
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
      },
    },
  });
}
