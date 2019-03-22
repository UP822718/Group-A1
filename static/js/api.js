function setFirstName(name) {
await fetch('/api/firstname', {
    method: 'POST',
    headers: {
      'Accept': 'application/text',
      'Content-Type': 'application/text'
    },
    body: name
  });
}

function setLastName(name) {

  await fetch('/api/lastname', {
      method: 'POST',
      headers: {
        'Accept': 'application/text',
        'Content-Type': 'application/text'
      },
      body: name
    });
}


function setWeight(weight) {
  fetch('/api/weight', {
      method: 'POST',
      headers: {
        'Accept': 'application/text',
        'Content-Type': 'application/text'
      },
      body: weight
    });

}

function setHeight(height) {
  fetch('/api/height', {
      method: 'POST',
      headers: {
        'Accept': 'application/text',
        'Content-Type': 'application/text'
      },
      body: height
    });

}

function setHydration(liter) {
  fetch('/api/hydration', {
      method: 'POST',
      headers: {
        'Accept': 'application/text',
        'Content-Type': 'application/text'
      },
      body: liter
    });

}
function setStepsTaken(steps) {
  fetch('/api/stepstake', {
      method: 'POST',
      headers: {
        'Accept': 'application/text',
        'Content-Type': 'application/text'
      },
      body: steps
    });

}
