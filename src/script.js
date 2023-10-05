// JavaScript for switching between calculation options
document.addEventListener("DOMContentLoaded", function () {
    const calculationSelect = document.getElementById('calculationSelect');
    const meaInputs = document.getElementById('meaInputs');
    const oatsInputs = document.getElementById('oatsInputs');
    const pdaInputs = document.getElementById('pdaInputs');
    const softAgarCheckbox = document.getElementById('softAgarCheckbox');
    const resultDisplay = document.getElementById('result');

    calculationSelect.addEventListener('change', function () {
        // Clear previous calculations and input when changing the calculation type
        resultDisplay.innerHTML = '';
        document.getElementById('waterAmountMEA').value = '';
        document.getElementById('oatsWeight').value = '';
        document.getElementById('waterAmountPDA').value = '';
        if (document.getElementById('softAgarCheckbox')) {
            document.getElementById('softAgarCheckbox').checked = false;
        }
        if (document.getElementById('hydrationPercentage')) {
            document.getElementById('hydrationPercentage').value = '75';
        }

        if (calculationSelect.value === 'mea') {
            if (meaInputs) meaInputs.classList.remove('hidden');
            if (oatsInputs) oatsInputs.classList.add('hidden');
            if (pdaInputs) pdaInputs.classList.add('hidden');
            if (document.getElementById('oatsOptions')) {
                document.getElementById('oatsOptions').classList.add('hidden');
            }
            if (softAgarCheckbox) softAgarCheckbox.disabled = false;
        } else if (calculationSelect.value === 'oats') {
            if (meaInputs) meaInputs.classList.add('hidden');
            if (oatsInputs) oatsInputs.classList.remove('hidden');
            if (pdaInputs) pdaInputs.classList.add('hidden');
            if (document.getElementById('oatsOptions')) {
                document.getElementById('oatsOptions').classList.remove('hidden');
            }
            if (softAgarCheckbox) softAgarCheckbox.disabled = true;
        } else if (calculationSelect.value === 'pda') {
            if (meaInputs) meaInputs.classList.add('hidden');
            if (oatsInputs) oatsInputs.classList.add('hidden');
            if (pdaInputs) pdaInputs.classList.remove('hidden');
            if (document.getElementById('oatsOptions')) {
                document.getElementById('oatsOptions').classList.add('hidden');
            }
            if (softAgarCheckbox) softAgarCheckbox.disabled = false;
        }
    });

    // JavaScript for performing calculations on input change
    const calculateValues = () => {
        const selectedCalculation = calculationSelect.value;

        if (selectedCalculation === 'mea') {
            // Get input values and perform MEA (Malt Extract Agar) calculations
            const waterAmountMEA = parseFloat(document.getElementById('waterAmountMEA').value);
            const meAmount = (30 / 1000) * waterAmountMEA; // ME (malt extract) is 30g per 1L
            let agarAmount = (20 / 1000) * waterAmountMEA; // Agar is 20g per 1L

            // Check if "Soft Agar" checkbox is checked, adjust agarAmount accordingly
            if (softAgarCheckbox && softAgarCheckbox.checked) {
                agarAmount = (15 / 1000) * waterAmountMEA; // Soft Agar is 15g per 1L
            }

            const result = `MEA (Malt Extract Agar) Recipe:\n${meAmount.toFixed(2)} g Malt extract\n${agarAmount.toFixed(2)} g Agar\n${waterAmountMEA} ML Distilled water`;

            // Display the result
            resultDisplay.innerHTML = `<pre>${result}</pre>`;
        } else if (selectedCalculation === 'oats') {
            // Get input values for Oats Water Content calculations
            const oatsWeight = parseFloat(document.getElementById('oatsWeight').value);
            const hydrationPercentage = parseFloat(document.getElementById('hydrationPercentage').value);
            const waterAmount = (oatsWeight * hydrationPercentage) / 100;

            // Display the result
            resultDisplay.innerHTML = `Water needed for ${hydrationPercentage}% hydration: ${waterAmount.toFixed(2)} g`;
        } else if (selectedCalculation === 'pda') {
            // Get input values and perform PDA (Potato Dextrose Agar) calculations
            const waterAmountPDA = parseFloat(document.getElementById('waterAmountPDA').value);
            const potatoFlakesAmount = (4 / 1000) * waterAmountPDA; // Potato flakes are 4g per 1L
            const infusedPotatoesAmount = (200 / 1000) * waterAmountPDA; // Infused potatoes are 200g per 1L
            const dextroseAmount = (20 / 1000) * waterAmountPDA; // Dextrose is 20g per 1L
            let agarAmountPDA = (20 / 1000) * waterAmountPDA; // Agar is 20g per 1L

            // Check if "Soft Agar" checkbox is checked, adjust agarAmount accordingly
            if (softAgarCheckbox && softAgarCheckbox.checked) {
                agarAmountPDA = (15 / 1000) * waterAmountPDA; // Soft Agar is 15g per 1L
            }

            const result = `PDA (Potato Dextrose Agar) Recipe:\n${potatoFlakesAmount.toFixed(2)} g Potato flakes OR ${infusedPotatoesAmount.toFixed(2)} g Infused potatoes\n${dextroseAmount.toFixed(2)} g Dextrose\n${agarAmountPDA.toFixed(2)} g Agar\n${waterAmountPDA} ML water`;

            // Display the result
            resultDisplay.innerHTML = `<pre>${result}</pre>`;
        }
    };

    // Attach input event listeners to trigger calculations on input change
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', calculateValues);
    });

    // Initial calculation on page load
    //calculateValues();
});
