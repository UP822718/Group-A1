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
	try {
		HMonday=result.topHydration[0].hydrationValue;
	} catch(e){
		HMonday=0;
	}
	try {
		HTuesday=result.topHydration[1].hydrationValue;
	} catch(e) {
		HTuesday=0;
	}
	try {
		HWednesday=result.topHydration[2].hydrationValue;
	} catch(e) {
		HWednesday=0;
	}
	try {
		HThursday=result.topHydration[3].hydrationValue;
	} catch(e) {
		HThursday=0;
	}
	try {
		HFriday=result.topHydration[4].hydrationValue;
	} catch(e) {
		HFriday=0;
	}
	try {
		HSaturday =result.topHydration[5].hydrationValue;
	} catch(e) {
		HSaturday=0;
	}
	try {
		HSunday = result.topHydration[6].hydrationValue;
	} catch(e) {
		HSunday=0;
	}
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

	try {
		WMonday=result.topWeight[0].weightValue;
	} catch(e){
		WMonday=0;
	}
	try {
		WTuesday=result.topWeight[1].weightValue;
	} catch(e) {
		WTuesday=0;
	}
	try {
		WWednesday=result.topWeight[2].weightValue;
	} catch(e) {
		WWednesday=0;
	}
	try {
		WThursday=result.topWeight[3].weightValue;
	} catch(e) {
		WThursday=0;
	}
	try {
		WFriday=result.topWeight[4].weightValue;
	} catch(e) {
		WFriday=0;
	}
	try {
		WSaturday=result.topWeight[5].weightValue;
	} catch(e) {
		WSaturday=0;
	}
	try {
		WSunday=result.topWeight[6].weightValue;
	} catch(e) {
		WSunday=0;
	}
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

	document.getElementById("MinHydration").innerHTML = "Minimal hydration: " +(result.topWeight[0].weightValue*10)+"Liter";
	
	try {
		CMon=result.topCalories[0].caloriesValue;
	} catch(e){
		CMon=0;
	}
	try {
		CTue=result.topCalories[1].caloriesValue;
	} catch(e) {
		CTue=0;
	}
	try {
		CWed=result.topCalories[2].caloriesValue;
	} catch(e) {
		CWed=0;
	}
	try {
		CThu=result.topCalories[3].caloriesValue;
	} catch(e) {
		CThu=0;
	}
	try {
		CFri=result.topCalories[4].caloriesValue;
	} catch(e) {
		CFri=0;
	}
	try {
		CSat=result.topCalories[5].caloriesValue;
	} catch(e) {
		CSat=0;
	}
	try {
		CSun=result.topCalories[6].caloriesValue;
	} catch(e) {
		CSun=0;
	}
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
			text: "calories consume per Day"
		},
		axisY: {
			title: "calories consume"
		},
		data: [{
			type: "column",
			showInLegend: true,
			legendMarkerColor: "grey",
			legendText: "Most Recent 7 Stats",
			dataPoints: [
				{ y: CMon, label: cDay1 },
				{ y: CTue,  label: cDay2 },
				{ y: CWed,  label: cDay3 },
				{ y: CThu,  label: cDay4 },
				{ y: CFri,  label: cDay5 },
				{ y: CSat, label: cDay6 },
				{ y: CSun,  label: cDay7 }
			]
		}]
	});
	cChart.render();

	try {
		SMon=result.topSteps[0].stepsValue;
	} catch(e){
		SMon=0;
	}
	try {
		STue=result.topSteps[1].stepsValue;
	} catch(e) {
		STue=0;
	}
	try {
		SWed=result.topSteps[2].stepsValue;
	} catch(e) {
		SWed=0;
	}
	try {
		SThu=result.topSteps[3].stepsValue;
	} catch(e) {
		SThu=0;
	}
	try {
		SFri=result.topSteps[4].stepsValue;
	} catch(e) {
		SFri=0;
	}
	try {
		SSat=result.topSteps[5].stepsValue;
	} catch(e) {
		SSat=0;
	}
	try {
		SSun=result.topSteps[6].stepsValue;
	} catch(e) {
		SSun=0;
	}
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
			{ y: SMon, label: sDay1 },
			{ y: STue,  label: sDay2 },
			{ y: SWed,  label: sDay3 },
			{ y: SThu,  label: sDay4 },
			{ y: SFri,  label: sDay5 },
			{ y: SSat, label: sDay6 },
			{ y: SSun,  label: sDay7 }
		]
	}]
	});
	sChart.render();
});

}
