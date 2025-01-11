document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category');
    const fromSelect = document.getElementById('LUFrom');
    const toSelect = document.getElementById('LUTo');

    const units = {
        length: [
            {value : 'm', text: 'metre(s)'},
            {value : 'cm', text: 'centimetre(s)'},
            {value : 'mm', text: 'millimetre(s)'},
            {value : 'km', text: 'kilometre(s)'},
            {value : 'in', text: 'inch(es)'},
            {value : 'ft', text: 'feet'},
            {value : 'yd', text: 'yard(s)'},
            {value : 'mi', text: 'mile(s)'},
        ], 
        weight: [
            {value: 'g', text: 'gram(s)'},
            {value: 'kg', text: 'kilogram(s)'},
            {value: 'mg', text: 'milligram(s)'},
            {value: 'lb', text: 'pound(s)'},
            {value: 'oz', text: 'ounce(s)'},
        ],
        temperature: [
            {value: 'c', text: 'Celsius'},
            {value: 'f', text: 'Fahrenheit'},
            {value: 'k', text: 'Kelvin'},
        ]
    };
    function fillunits(category){
        fromSelect.innerHTML = ' ';
        toSelect.innerHTML = ' ';
        units[category].forEach(unit => {
            const optionFrom = document.createElement('option');
            optionFrom.value = unit.value;
            optionFrom.text = unit.text;
            fromSelect.appendChild(optionFrom);

            const optionTo = document.createElement('option');
            optionTo.value = unit.value;
            optionTo.textContent = unit.text;
            toSelect.appendChild(optionTo);
        });
    }
categorySelect.addEventListener('change', function(){
    fillunits(this.value);
});

fillunits(categorySelect.value);

//fillunits
document.getElementById ('submitconv').addEventListener ('click', function(event) {
    event.preventDefault() ;

    const fromUnit = fromSelect.value;
    const toUnit = toSelect.value;
    const inputValue = parseFloat(document.getElementById('inputValue').value);

    let conValue;
    if(categorySelect.value === 'length'){
    const conversionFactors = {
        'in': 0.0254,
        'ft': 0.3048,
        'yd': 0.9144,
        'mi': 1609.34,
        'm': 1,
        'cm': 0.01,
        'mm': 0.001,
        'km': 1000
    };
    const valueLen = inputValue * conversionFactors[fromUnit];
    conValue = valueLen / conversionFactors[toUnit];
    }
    else if (categorySelect.value === 'weight'){
        const conversionFactors = {
            'g': 1,
            'kg': 1000,
            'mg': .001,
            'lb': 453.592,
            'oz': 28.3495,
        };
        const valuegrams = inputValue * conversionFactors[fromUnit];
        conValue = valuegrams / conversionFactors[toUnit];
    }
    else if(categorySelect.value === 'temperature'){
        if(fromUnit === 'c' && toUnit === 'f'){
            conValue = (inputValue * 9/5) + 32;
        }
        else if(toUnit === 'c' && fromUnit === 'f'){
            conValue = (inputValue - 32) * 5/9;
        } else if (fromUnit = 'c' && toUnit === 'k'){
            conValue = inputValue +273.15;
        }
        else if(fromUnit === 'k' && toUnit === 'c'){
            conValue = inputValue - 273.15;
        }
        else if(fromUnit === 'f' && toUnit === 'k'){
            conValue = (inputValue - 32) * 5/9 + 273.15;
        }
        else if(fromUnit === 'k' && toUnit === 'f'){
            conValue = (inputValue - 273.15) * 9/5 + 32;
        }
        else{
            conValue = inputValue;
        }
}

document.getElementById('resultarea').textContent = `Converted value : ${conValue} ${toUnit}`;
});
});