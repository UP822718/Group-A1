window.onload = function () {
	async function getTop7() {
		let res = await fetch('/getTop7');
		console.log("RES:", res);
		let data = await res.json();
		console.log("Data:", data);
		return data;
	}
let jsonArray = getTop7();
console.log("jsonArray: ",jsonArray);
jsonArray.then(function(result) {
	console.log("statArray:",result);
	console.log("hydrationArray:",result.topHydration);

	HMonday=result.topHydration[0].hydrationValue;
	HTuesday=result.topHydration[1].hydrationValue;
	HWednesday=result.topHydration[2].hydrationValue;
	HThursday=result.topHydration[3].hydrationValue;
	HFriday=result.topHydration[4].hydrationValue;
	HSaturday =result.topHydration[5].hydrationValue;
	HSunday = result.topHydration[6].hydrationValue;
	Hdaynum =0
	Hday1 =(Hdaynum+1)
	Hday2 =(Hdaynum+2)
	Hday3 =(Hdaynum+3)
	Hday4 =(Hdaynum+4)
	Hday5 =(Hdaynum+5)
	Hday6 =(Hdaynum+6)
	Hday7 =(Hdaynum+7)

	var chart = new CanvasJS.Chart("HydrationLevel", {
		animationEnabled: true,
		theme: "light2",
		title:{
			text: "Hydration Level"
		},
		axisY: {
			title: "Hydration in Litres"
		},
		data: [{
			type: "column",
			showInLegend: true,
			legendMarkerColor: "grey",
			legendText: "Most Recent 7 Stats",
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

	WMonday=result.topWeight[0].weightValue;
	WTuesday=result.topWeight[1].weightValue;
	WWednesday=result.topWeight[2].weightValue;
	WThursday=result.topWeight[3].weightValue;
	WFriday=result.topWeight[4].weightValue;
	WSaturday =result.topWeight[5].weightValue;
	WSunday =result.topWeight[6].weightValue;
	Wdaynum =0
	Wday1 =(Wdaynum+1)
	Wday2 =(Wdaynum+2)
	Wday3 =(Wdaynum+3)
	Wday4 =(Wdaynum+4)
	Wday5 =(Wdaynum+5)
	Wday6 =(Wdaynum+6)
	Wday7 =(Wdaynum+7)

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
			legendText: "Most Recent 7 Stats",
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

	let cMon =result.topCalories[0].caloriesValue;
	let cTue =result.topCalories[1].caloriesValue;
	let cWed =result.topCalories[2].caloriesValue;
	let cThu =result.topCalories[3].caloriesValue;
	let cFri =result.topCalories[4].caloriesValue;
	let cSat =result.topCalories[5].caloriesValue;
	let cSun =result.topCalories[6].caloriesValue;
	let cDaynum = 0
	let cDay1 =(cDaynum+1)
	let cDay2 =(cDaynum+2)
	let cDay3 =(cDaynum+3)
	let cDay4 =(cDaynum+4)
	let cDay5 =(cDaynum+5)
	let cDay6 =(cDaynum+6)
	let cDay7 =(cDaynum+7)

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
			legendText: "Most Recent 7 Stats",
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

	let sMon =result.topSteps[0].stepsValue;
	let sTue =result.topSteps[0].stepsValue;
	let sWed =result.topSteps[0].stepsValue;
	let sThu =result.topSteps[0].stepsValue;
	let sFri =result.topSteps[0].stepsValue;
	let sSat =result.topSteps[0].stepsValue;
	let sSun =result.topSteps[0].stepsValue;
	let sDaynum = 0
	let sDay1 =(sDaynum+1)
	let sDay2 =(sDaynum+2)
	let sDay3 =(sDaynum+3)
	let sDay4 =(sDaynum+4)
	let sDay5 =(sDaynum+5)
	let sDay6 =(sDaynum+6)
	let sDay7 =(sDaynum+7)

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
		legendText: "Most Recent 7 Stats",
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
});
}
