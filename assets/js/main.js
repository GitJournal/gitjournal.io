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
  console.log(data);

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

  const date = new Date(year, month - 1, 1);
  const monthName = date.toLocaleString("default", { month: "long" });

  new Chart(ctx, {
    type: "line",
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
          },
        ],
      },
    },
  });
}
