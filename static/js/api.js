function setWeight(weightValue) {
  fetch('/api/weight', {
      method: 'POST',
      headers: {
        'Accept': 'application/text',
        'Content-Type': 'application/text'
      },
      body: weightValue
    });

}

function setHeight(heightValue) {
  fetch('/api/height', {
      method: 'POST',
      headers: {
        'Accept': 'application/text',
        'Content-Type': 'application/text'
      },
      body: heightValue
    });

}

function setHydration(hydrationValue) {
  fetch('/api/hydration', {
      method: 'POST',
      headers: {
        'Accept': 'application/text',
        'Content-Type': 'application/text'
      },
      body: hydrationValue
    });

}
function setStepsTaken(stepsValue) {
  fetch('/api/stepstake', {
      method: 'POST',
      headers: {
        'Accept': 'application/text',
        'Content-Type': 'application/text'
      },
      body: stepsValue
    });

}
