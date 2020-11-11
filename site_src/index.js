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

document.addEventListener('DOMContentLoaded', init);
