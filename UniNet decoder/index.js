import {
  seriesSvgAnnotation
} from "../annotation-series.js";
import {
  distance,
  trunc,
  hashCode,
  webglColor,
  iterateElements
} from "../util.js";

var data = [];
var quadtree;
var labFill, toneFill, fillColor, color_labFill, color_toneFill;
var closestDatum, cur_lab = "undefined";
var lab_selectedQ = true, tone_selectedQ = false;

const createAnnotationData = datapoint => ({
  note: {
    label: datapoint.lab + " " + datapoint.tone,
    bgPadding: 5,
  },
  x: datapoint.x,
  y: datapoint.y,
  dx: 20,
  dy: 20
});

// create a web worker that streams the chart data
const streamingLoaderWorker = new Worker("../streaming-tsv-parser.js");
streamingLoaderWorker.onmessage = ({
  data: {
    items,
    totalBytes,
    finished
  }
}) => {
  const rows = items
    .map(d => ({
      ...d,
      x: Number(d.x),
      y: Number(d.y),
    }));
  data = data.concat(rows);

  if (finished) {
    document.getElementById("loading").style.display = "none";

    // compute the fill color for each datapoint
    const lab = ["a", "ai", "an", "ang", "ao", "b", "c", "ch", "d", "e", "ei", "en", "eng", "er", "f", "g", "h", "i", "ia", "ian", "iang", "iao", "ie", "ii", "iii", "in", "ing", "iong", "iou", "j", "k", "l", "m", "n", "o", "ong", "ou", "p", "q", "r", "s", "sh", "t", "u", "ua", "uai", "uan", "uang", "uei", "uen", "ueng", "uo", "v", "van", "ve", "vn", "x", "z", "zh", "sil", "sp"]
    //n = 8; a = ColorData["Rainbow"][#/(n - 1)] & /@ Range[0, n - 1]
    //hexifyColor[color_RGBColor] := StringJoin["#", IntegerString[Round[Level[color, 1]*255], 16, 2]]
    //hexifyColor /@ a
    const lab_color = ["#781c86", "#6d1c90", "#621d99", "#571ea2", "#4e20ab", "#4a27b2", "#462eb9", "#4236c1", "#403ec6", "#3f47c9", "#3f51cc", "#3e5acf", "#3f63cf", "#416bce", "#4274ce", "#447ccd", "#4783c8", "#498ac4", "#4c90c0", "#4f97bb", "#539bb5", "#56a0ae", "#5aa5a8", "#5ea9a1", "#63ac9a", "#68af93", "#6cb28c", "#72b485", "#78b67e", "#7db877", "#83ba70", "#89bb6b", "#90bc65", "#96bd60", "#9dbe5a", "#a3be56", "#aabd52", "#b0bd4e", "#b7bd4b", "#bdbb48", "#c3ba46", "#c9b843", "#ceb541", "#d3b240", "#d8ae3e", "#dcab3c", "#dfa53b", "#e19f3a", "#e49938", "#e69237", "#e68a35", "#e68133", "#e67832", "#e56e30", "#e4632e", "#e2582c", "#e04e29", "#df4327", "#dd3726", "#dc2c24", "#db2122"]
    //创建音素与对应颜色的序数比例尺
    const lab_f = d3.scaleOrdinal().domain(lab).range(lab_color);

    const tone = ["1", "2", "3", "4", "5", "6", "7", "8"]
    const tone_color = ["#781c86", "#3f43c8", "#4a8bc3", "#6bb18e", "#9ebe59", "#d2b240", "#e67d33", "#db2122"]
    const tone_f = d3.scaleOrdinal().domain(tone).range(tone_color);

    labFill = d => webglColor(lab_f(d.lab));
    toneFill = d => webglColor(tone_f(d.tone));

    color_labFill = new Array();
    for (let i = 0; i < lab.length; i++)
      color_labFill[lab[i]] = d => webglColor(d.lab === lab[i] ? lab_color[i] : "#353535");

    color_toneFill = new Array();
    for (let i = 0; i < tone.length; i++)
      color_toneFill[tone[i]] = d => webglColor(d.tone === tone[i] ? tone_color[i] : "#353535");

    fillColor = fc.webglFillColor().value(labFill).data(data);
    pointSeries.decorate(program => fillColor(program));

    // wire up the fill color selector
    iterateElements(".controls a", el => {
      el.addEventListener("click", () => {
        iterateElements(".controls a", el2 => el2.classList.remove("active"));
        el.classList.add("active");
        var svg_name = document.getElementById('svg')
        if (el.id === "lab")
          svg_name.src = "../phone_name_legend.svg";
        else
          svg_name.src = "../tone_legend.svg";
        if (el.id === "lab") {
          lab_selectedQ = true;
          tone_selectedQ = false;
          fillColor.value(labFill);
        } else {
          lab_selectedQ = false;
          tone_selectedQ = true;
          fillColor.value(toneFill);
        }
        //fillColor.value(el.id === "lab" ? labFill : toneFill);
        redraw();
      });
    });

    // create a spatial index for rapidly finding the closest datapoint
    quadtree = d3
      .quadtree()
      .x(d => d.x)
      .y(d => d.y)
      .addAll(data);
  }

  redraw();
};

streamingLoaderWorker.postMessage("UniNet decoder.tsv");

const xScale = d3.scaleLinear().domain([-20, 20]);
const yScale = d3.scaleLinear().domain([-20, 20]);
const xScaleOriginal = xScale.copy();
const yScaleOriginal = yScale.copy();

const pointSeries = fc
  .seriesWebglPoint()
  .equals((a, b) => a === b)
  .size(1)
  .crossValue(d => d.x)
  .mainValue(d => d.y);

const zoom = d3
  .zoom()
  .scaleExtent([0.8, 50])
  .on("zoom", () => {
    // update the scales based on current zoom
    xScale.domain(d3.event.transform.rescaleX(xScaleOriginal).domain());
    yScale.domain(d3.event.transform.rescaleY(yScaleOriginal).domain());
    redraw();
  });

const annotations = [];

d3.select("#chart").on('click', () => {
  if (typeof (closestDatum) == "undefined") {
    cur_lab = "undefined";
    fillColor.value(lab_selectedQ ? labFill : toneFill);
  } else if (lab_selectedQ)
    fillColor.value(color_labFill[closestDatum.lab]);
  else if (tone_selectedQ)
    fillColor.value(color_toneFill[closestDatum.tone]);
  redraw();
});

const pointer = fc.pointer().on("point", ([coord]) => {
  annotations.pop();

  if (!coord || !quadtree) {
    return;
  }

  // find the closes datapoint to the pointer
  const x = xScale.invert(coord.x);
  const y = yScale.invert(coord.y);
  const radius = Math.abs(xScale.invert(coord.x) - xScale.invert(coord.x - 20));
  closestDatum = quadtree.find(x, y, radius);

  // if the closest point is within 20 pixels, show the annotation
  if (closestDatum) {
    annotations[0] = createAnnotationData(closestDatum);
    //new Audio("wav_phone/"+closestDatum.name+".wav").play();
  }

  redraw();
});

const annotationSeries = seriesSvgAnnotation()
  .notePadding(15)
  .type(d3.annotationCallout);

const chart = fc
  .chartCartesian(xScale, yScale)
  .webglPlotArea(
    // only render the point series on the WebGL layer
    fc
    .seriesWebglMulti()
    .series([pointSeries])
    .mapping(d => d.data)
  )
  .svgPlotArea(
    // only render the annotations series on the SVG layer
    fc
    .seriesSvgMulti()
    .series([annotationSeries])
    .mapping(d => d.annotations)
  )
  .decorate(sel =>
    sel
    .enter()
    .select("d3fc-svg.plot-area")
    .on("measure.range", () => {
      xScaleOriginal.range([0, d3.event.detail.width]);
      yScaleOriginal.range([d3.event.detail.height, 0]);
    })
    .call(zoom)
    .call(pointer)
  );

// render the chart with the required data
// Enqueues a redraw to occur on the next animation frame
const redraw = () => {
  d3.select("#chart").datum({
    annotations,
    data
  }).call(chart);
};