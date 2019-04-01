window.onload = function () {
Weight = 70
ExcerciceHour = 1
calculatehydration = (Weight * 3 +(ExcerciceHour*100))/100
HMonday=1.3
HTuesday=1.6
HWednesday=1.4
HThursday=0.5
HFriday=1.5
HSaturday = 1.4
HSunday = 1.7
Hdaynum =0
Hday1 ="Monday " + (Hdaynum+1)
Hday2 ="Tuesday " + (Hdaynum+2)
Hday3 ="Wednesday "+ (Hdaynum+3)
Hday4 ="Thursday "+ (Hdaynum+4)
Hday5 ="Friday "+ (Hdaynum+5)
Hday6 ="Saturday "+(Hdaynum+6)
Hday7 ="Sunday "+ (Hdaynum+7)

var chart = new CanvasJS.Chart("HydrationLevel", {
	animationEnabled: true,
	theme: "light2",
	title:{
		text: "Hydration Level"
	},
	axisY: {
		title: "Hydration in liter"
	},
	data: [{
		type: "column",
		showInLegend: true,
		legendMarkerColor: "grey",
		legendText: "Days of the Week",
		dataPoints: [
			{ y: HMonday,     label: Hday1 },
			{ y: HTuesday,    label: Hday2 },
			{ y: HWednesday,  label: Hday3 },
			{ y: HThursday,   label: Hday4 },
			{ y: HFriday,     label: Hday5 },
			{ y: HSaturday,   label: Hday6 },
			{ y: HSunday,     label: Hday7 },
		]
	}]
});
chart.render();


WMonday=90
WTuesday=91
WWednesday=90
WThursday=89
WFriday=88
WSaturday = 89
WSunday = 88
Wdaynum =0
Wday1 ="Monday " + (Wdaynum+1)
Wday2 ="Tuesday " + (Wdaynum+2)
Wday3 ="Wednesday "+ (Wdaynum+3)
Wday4 ="Thursday "+ (Wdaynum+4)
Wday5 ="Friday "+ (Wdaynum+5)
Wday6 ="Saturday "+(Wdaynum+6)
Wday7 ="Sunday "+ (Wdaynum+7)

var chart = new CanvasJS.Chart("Weight", {
	animationEnabled: true,
	theme: "light2",
	title:{
		text: "Weight"
	},
	axisY: {
		title: "Weight in kg"
	},
	data: [{
		type: "column",
		showInLegend: true,
		legendMarkerColor: "black",
		legendText: "Days of the Week",
		dataPoints: [
			{ y: WMonday,     label: Wday1 },
			{ y: WTuesday,    label: Wday2 },
			{ y: WWednesday,  label: Wday3 },
			{ y: WThursday,   label: Wday4 },
			{ y: WFriday,     label: Wday5 },
			{ y: WSaturday,   label: Wday6 },
			{ y: WSunday,     label: Wday7 },
		]
	}]
});
chart.render();

let cMon = 10000 * 0.05
let cTue = 7000 * 0.05
let cWed = 9458 * 0.05
let cThu = 2398 * 0.05
let cFri = 765 * 0.05
let cSat = 3876 * 0.05
let cSun = 8654 * 0.05
let cDaynum = 0
let cDay1 ="Monday " + (cDaynum+1)
let cDay2 ="Tuesday " + (cDaynum+2)
let cDay3 ="Wednesday "+ (cDaynum+3)
let cDay4 ="Thursday "+ (cDaynum+4)
let cDay5 ="Friday "+ (cDaynum+5)
let cDay6 ="Saturday "+(cDaynum+6)
let cDay7 ="Sunday "+ (cDaynum+7)

let cChart = new CanvasJS.Chart("calories", {
	animationEnabled: true,
	theme: "light2", // "light1", "light2", "dark1", "dark2"
	title:{
		text: "calories lost per Day"
	},
	axisY: {
		title: "calories lost"
	},
	data: [{
		type: "column",
		showInLegend: true,
		legendMarkerColor: "grey",
		legendText: "Days of the Week",
		dataPoints: [
			{ y: cMon, label: cDay1 },
			{ y: cTue,  label: cDay2 },
			{ y: cWed,  label: cDay3 },
			{ y: cThu,  label: cDay4 },
			{ y: cFri,  label: cDay5 },
			{ y: cSat, label: cDay6 },
			{ y: cSun,  label: cDay7 }
		]
	}]
});
cChart.render();

let sMon = 10000
let sTue = 7000
let sWed = 9458
let sThu = 2398
let sFri = 765
let sSat = 3876
let sSun = 8654
let sDaynum = 0
let sDay1 ="Monday " + (sDaynum+1)
let sDay2 ="Tuesday " + (sDaynum+2)
let sDay3 ="Wednesday "+ (sDaynum+3)
let sDay4 ="Thursday "+ (sDaynum+4)
let sDay5 ="Friday "+ (sDaynum+5)
let sDay6 ="Saturday "+(sDaynum+6)
let sDay7 ="Sunday "+ (sDaynum+7)

let sChart = new CanvasJS.Chart("stepsCount", {
animationEnabled: true,
theme: "light2", // "light1", "light2", "dark1", "dark2"
title:{
	text: "Steps per Day"
},
axisY: {
	title: "Steps"
},
data: [{
	type: "column",
	showInLegend: true,
	legendMarkerColor: "grey",
	legendText: "Days of the Week",
	dataPoints: [
		{ y: sMon, label: sDay1 },
		{ y: sTue,  label: sDay2 },
		{ y: sWed,  label: sDay3 },
		{ y: sThu,  label: sDay4 },
		{ y: sFri,  label: sDay5 },
		{ y: sSat, label: sDay6 },
		{ y: sSun,  label: sDay7 }
	]
}]
});
sChart.render();

}