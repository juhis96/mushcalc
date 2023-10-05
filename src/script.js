document.addEventListener("DOMContentLoaded", function () {
    const calculationSelect = document.getElementById('calculationSelect');
    const honeyInputs = document.getElementById('honeyInputs');
    const cocoInputs = document.getElementById('cocoInputs');
    const meaInputs = document.getElementById('meaInputs');
    const oatsInputs = document.getElementById('oatsInputs');
    const pdaInputs = document.getElementById('pdaInputs');
    const softAgarWrapper = document.getElementById('softAgarWrapper');
    const resultDisplay = document.getElementById('result');

    initializeHoneyCalculator();
    initializeCocoCalculator();
    initializeMEACalculator();
    initializeOatsCalculator();
    initializePDACalculator();

    calculationSelect.addEventListener('change', function () {
        // Clear previous calculations and input when changing the calculation type
        resultDisplay.innerHTML = '';
        document.getElementById('waterAmountMEA').value = '';
        document.getElementById('oatsWeight').value = '';
        document.getElementById('hydrationPercentage').value = '75'; // Default water content for Oats
        document.getElementById('waterAmountPDA').value = '';
        document.getElementById('softAgarCheckbox').checked = false;

        // Hide all input groups
        [honeyInputs, cocoInputs, meaInputs, oatsInputs, pdaInputs].forEach(section => {
            section.style.display = 'none';
        });

        // Show the selected input group and manage the Soft Agar checkbox visibility
        switch (calculationSelect.value) {
            case 'honey':
                honeyInputs.style.display = 'block';
                break;
            case 'coco':
                cocoInputs.style.display = 'block';
                break;
            case 'mea':
                meaInputs.style.display = 'block';
                break;
            case 'oats':
                oatsInputs.style.display = 'block';
                break;
            case 'pda':
                pdaInputs.style.display = 'block';
                break;
        }

        manageSoftAgarCheckboxVisibility(calculationSelect.value);
    });

    function manageSoftAgarCheckboxVisibility(selectedCalculation) {
        const isAgar = ['mea', 'pda'].includes(selectedCalculation);
        softAgarWrapper.style.display = isAgar ? 'block' : 'none';
    }

    function initializeHoneyCalculator() {
        const waterAmountHoney = document.getElementById('waterAmountHoney');
        const nutrientPercentageHoney = document.getElementById('nutrientPercentageHoney');

        function calculateHoney() {
            const water = parseFloat(waterAmountHoney.value);
            const nutrientPercentage = parseFloat(nutrientPercentageHoney.value);
            if (!isNaN(water) && !isNaN(nutrientPercentage)) {
                const honeyNeeded = (water * nutrientPercentage) / 100;
                resultDisplay.innerHTML = `For ${water} ml of water with ${nutrientPercentage}% nutrition: ${honeyNeeded.toFixed(2)} g of honey is needed.`;
            } else {
                resultDisplay.innerHTML = '';
            }
        }

        [waterAmountHoney, nutrientPercentageHoney].forEach(input => {
            input.addEventListener('input', calculateHoney);
        });
    }

    function initializeCocoCalculator() {
        const cocoWeight = document.getElementById('cocoWeight');
        const waterRatioCoco = document.getElementById('waterRatioCoco');

        function calculateCoco() {
            const weight = parseFloat(cocoWeight.value);
            const waterRatio = parseFloat(waterRatioCoco.value);
            if (!isNaN(weight) && !isNaN(waterRatio)) {
                const waterNeeded = weight * waterRatio;
                resultDisplay.innerHTML = `For ${weight} g of coco coir: ${waterNeeded.toFixed(2)} g/ml of water is needed.`;
            } else {
                resultDisplay.innerHTML = '';
            }
        }

        [cocoWeight, waterRatioCoco].forEach(input => {
            input.addEventListener('input', calculateCoco);
        });
    }

    function initializeMEACalculator() {
        const waterAmountMEA = document.getElementById('waterAmountMEA');
        const softAgarCheckbox = document.getElementById('softAgarCheckbox');

        function calculateMEA() {
            // Ensure that MEA is the selected calculation before proceeding
            if(calculationSelect.value !== 'mea') return;

            console.log("Calculating MEA...");

            const waterAmount = parseFloat(waterAmountMEA.value);
            const meAmount = (30 / 1000) * waterAmount;  
            let agarAmount = (20 / 1000) * waterAmount;  

            if (softAgarCheckbox.checked) {
                console.log("Soft Agar Checked for MEA...");
                agarAmount = (15 / 1000) * waterAmount;  
            }

            const result = `MEA (Malt Extract Agar) Recipe:\n${meAmount.toFixed(2)} g Malt extract\n${agarAmount.toFixed(2)} g Agar\n${waterAmount} ML Distilled water`;

            resultDisplay.innerHTML = `<pre>${result}</pre>`;
        }

        [waterAmountMEA, softAgarCheckbox].forEach(input => {
            input.addEventListener('input', calculateMEA);
        });
    }

    function initializePDACalculator() {
        const waterAmountPDA = document.getElementById('waterAmountPDA');
        const softAgarCheckbox = document.getElementById('softAgarCheckbox');

        function calculatePDA() {
            // Ensure that PDA is the selected calculation before proceeding
            if(calculationSelect.value !== 'pda') return;

            console.log("Calculating PDA...");

            const waterAmount = parseFloat(waterAmountPDA.value);
            const potatoFlakesAmount = (4 / 1000) * waterAmount;  
            const infusedPotatoesAmount = (200 / 1000) * waterAmount;  
            const dextroseAmount = (20 / 1000) * waterAmount;  
            let agarAmount = (20 / 1000) * waterAmount;  

            if (softAgarCheckbox.checked) {
                console.log("Soft Agar Checked for PDA...");
                agarAmount = (15 / 1000) * waterAmount;  
            }

            const result = `PDA (Potato Dextrose Agar) Recipe:\n${potatoFlakesAmount.toFixed(2)} g Potato flakes OR ${infusedPotatoesAmount.toFixed(2)} g Infused potatoes\n${dextroseAmount.toFixed(2)} g Dextrose\n${agarAmount.toFixed(2)} g Agar\n${waterAmount} ML water`;

            resultDisplay.innerHTML = `<pre>${result}</pre>`;
        }

        [waterAmountPDA, softAgarCheckbox].forEach(input => {
            input.addEventListener('input', calculatePDA);
        });
    }
    
    function initializeOatsCalculator() {
        const oatsWeight = document.getElementById('oatsWeight');
        const hydrationPercentage = document.getElementById('hydrationPercentage');

        [oatsWeight, hydrationPercentage].forEach(input => {
            input.addEventListener('input', function () {
                const weight = parseFloat(oatsWeight.value);
                const hydration = parseFloat(hydrationPercentage.value);
                const waterAmount = (weight * hydration) / 100;

                resultDisplay.innerHTML = `Water needed for ${hydration}% hydration: ${waterAmount.toFixed(2)} g`;
            });
        });
    }
});
