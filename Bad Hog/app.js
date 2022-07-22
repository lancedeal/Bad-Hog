
var total = 0
const totalCalculation = document.querySelector('.estimator-total-calculation')

const clearingInput = document.getElementById('clearing-select')
const disposalInput = document.getElementById('disposal-select')
const equipmentInput = document.getElementById('equipment-select')

const clearingUnit = document.getElementById('clearing-unit')
const disposalUnit = document.getElementById('disposal-unit')
const equipmentUnit = document.getElementById('equipment-unit')

const clearingBtn = document.getElementById('clearing-button').addEventListener('click', () => {
    if(clearingInput.value != "" && clearingUnit.value > 0){
        if(clearingInput.value == 'heavy'){
            for(let i = 0; i < clearingUnit.value; i++){
                total += 2000
            }
        } else {
            for(let i = 0; i < clearingUnit.value;i++){
                total += 1500
            }
        }
        totalCalculation.textContent = total
    }
})
const disposalBtn = document.getElementById('disposal-button').addEventListener('click', () => {
    if(disposalInput.value != "" && disposalUnit.value > 0){
        if(disposalInput.value == 'burning'){
            for(let i = 0; i < disposalUnit.value; i++){
                total += 150
            }
        } else if(disposalInput.value == 'mulching') {
            for(let i = 0; i < disposalUnit.value; i++){
                total += 250
            }
        } else {
            for(let i = 0; i < disposalUnit.value; i++){
                total += 100
            }
        }
        totalCalculation.textContent = total
    }
})
const equipmentBtn = document.getElementById('equipment-button').addEventListener('click', () => {
    if(equipmentInput.value != "" && equipmentUnit.value > 0){
        if(equipmentInput.value == 'skidsteer'){
            for(let i = 0; i < equipmentUnit.value; i++){
                total += 500
            }
        } else if(equipmentInput.value == 'chip-shredder'){
            for(let i = 0; i < equipmentUnit.value; i++){
                total += 500
            }
        } else {
            for(let i = 0; i < equipmentUnit.value; i++){
                total += 300
            }
        }
        totalCalculation.textContent = total
        console.log('Total Updated')
    }
})
const clearTotalBtn = document.getElementById('clear-total-button').addEventListener('click', () => {
    total = 0
    totalCalculation.textContent = total
})