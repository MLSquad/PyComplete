const EXTERNAL_AREA_LOAD_MS = 200;

const changeProcessor = {
    waiting: 0,
    received: 0,

    processChange() {
        sendProcessingRequest(this);
    }
};

const frameInit = () => {
    let frame = document.querySelector("#frame_editor");
    frame.style.width  = "100%";
    frame.style.height = "100%";

    let frameDoc = frames['frame_editor'].document;

    frameDoc.querySelectorAll(".area_toolbar").forEach(elem => {
        elem.style.display = "none"; // get rid of some unnecessary design elements
    });

    let runModelButton = document.querySelector(".run-model");
    runModelButton.addEventListener('click', () => {
        changeProcessor.processChange();
    });
}

const fillSuggestions = (result) => {
    const suggestionArea = document.querySelector(".suggestions");
    suggestionArea.innerHTML = "";

    let suggestions = [];
    result.forEach(sug => {
        const p = document.createElement('p');
        p.innerHTML = JSON.stringify(sug);
        suggestionArea.appendChild(p);
    });
}

const sendProcessingRequest = async (processor) => {
    processor.waiting++;
    let content = editAreaLoader.getValue("editor");
    let wrapped = {
        text: JSON.stringify(content)
    };
    let response = await fetch('http://localhost:3030/autocomplete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(wrapped)
    });

    let result = await response.json();
    processor.received++;
    
    if (processor.waiting === processor.received) {
        fillSuggestions(result.result);
    }
}

const init = () => {
    editAreaLoader.init({
        id: "editor", 
        syntax: "python", 
        start_highlight: true, 
        toolbar: "|, select_font, |",
        allow_toggle: false
    });

    setTimeout(frameInit, EXTERNAL_AREA_LOAD_MS);
}

const fillDummyData = () => {
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let p3 = document.createElement('p');
    let p4 = document.createElement('p');
    let p5 = document.createElement('p');
    let p6 = document.createElement('p');
    let p7 = document.createElement('p');
	p1.innerHTML = 'suggestion1';
	p2.innerHTML = 'suggestion2';
	p3.innerHTML = 'suggestion3';
	p4.innerHTML = 'suggestion4';
	p5.innerHTML = 'suggestion5';
	p6.innerHTML = 'suggestion6';
	p7.innerHTML = 'suggestion7';
	$(".suggestions")[0].appendChild(p1);
	$(".suggestions")[0].appendChild(p2);
	$(".suggestions")[0].appendChild(p3);
	$(".suggestions")[0].appendChild(p4);
	$(".suggestions")[0].appendChild(p5);
	$(".suggestions")[0].appendChild(p6);
	$(".suggestions")[0].appendChild(p7);
}

// inits editArea
document.addEventListener('DOMContentLoaded', init);
// fills in dummy data results
document.addEventListener('DOMContentLoaded', fillDummyData);
