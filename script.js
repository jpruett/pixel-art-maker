document.addEventListener('DOMContentLoaded', function () {
    let canvas = document.querySelector('.canvas');
    const rowSize = 34;
    const rows = 48;

    for (let i = 1; i <= rows; i++) {
        let outerDiv = document.createElement('div');
        for (let j = 1; j <= rowSize; j++) {
            let div = document.createElement('div');
            div.className = 'pixel';
            outerDiv.appendChild(div);
        }
        canvas.appendChild(outerDiv);
    }


    let chosenColor = "black";
    let isClicked = false;
    
    document.addEventListener('mousedown', () => {
        isClicked = true;
    });

    document.addEventListener('mouseup', () => {
        isClicked = false;
    });

    document.querySelector('.canvas').addEventListener('click', (event) => {
        if (event.target.className.includes('pixel')) {
            event.target.style.backgroundColor = chosenColor;
        }
    });
    document.querySelectorAll('.pixel').forEach(item => {
        item.addEventListener('mouseenter', (event) => { 
            if (isClicked)
                event.target.style.backgroundColor = chosenColor; 
        });
    })

    document.querySelector('.pallette').addEventListener('click', (event) => {
            console.log(event.target.style.backgroundColor);
            chosenColor = event.target.style.backgroundColor;

            let selColor = document.querySelector(".selectedColor");
            selColor.style.backgroundColor = chosenColor;
    })

    document.querySelector('.js-clear').addEventListener('click', (event) => {
        let pixels = document.querySelectorAll('.pixel');
        pixels.forEach(x => {x.style.backgroundColor = "white";});
    });

    document.querySelector('.colorPicker').addEventListener('change', (event) => {
        console.log(event.target);
        chosenColor = event.target.value;
        document.querySelector(".selectedColor").style.backgroundColor = chosenColor;
    });

    document.querySelector('.js-save').addEventListener('click', () => {
        window.localStorage.setItem("lastImage", document.querySelector('.canvas').innerHTML);
    });

    document.querySelector('.js-load').addEventListener('click', () => {
        document.querySelector('.canvas').innerHTML = "";
        const template = document.createElement('template');
        template.innerHTML = window.localStorage.getItem("lastImage");
        document.querySelector('.canvas').appendChild(template.content);

        document.querySelectorAll('.pixel').forEach(item => {
            item.addEventListener('mouseenter', (event) => { 
                if (isClicked)
                    event.target.style.backgroundColor = chosenColor; 
            });
        });
    });
})