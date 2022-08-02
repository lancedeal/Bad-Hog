

// Testimonial Gallery Scripts


const gallerySet1 = document.getElementById('set-1')
const gallerySet2 = document.getElementById('set-2')
const gallerySet3 = document.getElementById('set-3')
const gallerySet4 = document.getElementById('set-4')
const gallerySet5 = document.getElementById('set-5')

const backSet1 = document.getElementById('back-set-1')
const nextSet1 = document.getElementById('next-set-1')
const backSet2 = document.getElementById('back-set-2')
const nextSet2 = document.getElementById('next-set-2')
const backSet3 = document.getElementById('back-set-3')
const nextSet3 = document.getElementById('next-set-3')
const backSet4 = document.getElementById('back-set-4')
const nextSet4 = document.getElementById('next-set-4')
const backSet5 = document.getElementById('back-set-5')
const nextSet5 = document.getElementById('next-set-5')

backSet1.addEventListener('click', () => { toggleSet(gallerySet1, gallerySet5) })
nextSet1.addEventListener('click', () => { toggleSet(gallerySet1, gallerySet2) })
backSet2.addEventListener('click', () => { toggleSet(gallerySet2, gallerySet1) })
nextSet2.addEventListener('click', () => { toggleSet(gallerySet2, gallerySet3) })
backSet3.addEventListener('click', () => { toggleSet(gallerySet3, gallerySet2) })
nextSet3.addEventListener('click', () => { toggleSet(gallerySet3, gallerySet4) })
backSet4.addEventListener('click', () => { toggleSet(gallerySet4, gallerySet3) })
nextSet4.addEventListener('click', () => { toggleSet(gallerySet4, gallerySet5) })
backSet5.addEventListener('click', () => { toggleSet(gallerySet5, gallerySet4) })
nextSet5.addEventListener('click', () => { toggleSet(gallerySet5, gallerySet1) })

function toggleSet(hide, show){
    hide.classList.add('hidden')
    show.classList.remove('hidden')
}



// Estimator Scripts

/*
    Second Draft Merge TODO:
        Event Listeners - Acre yes & no
        Total Calculation - Everything
        create function - toggle acreBoolean
*/


// The Divs
const clearDiv = document.querySelector('.estimator-clearing')
const acreBooleanDiv = document.querySelector('.estimator-acres-boolean')
const acreDiv = document.querySelector('.estimator-acres')
const dispoDiv = document.querySelector('.estimator-disposal')

// Acre Input
const acreYes = document.getElementById('acre-yes') // needs event listener
const acreNo = document.getElementById('acre-no') // needs event listener
const acreInput = document.getElementById('acre-input')

// Other Variables
var allowHaul = true
var clearDensity = ""
var acreNumber
var disposalMethod = ""
var skidSteerNeeded
var sub1Acre 
var total = 0

// Take care of this section !!! 
/*
const totalCalculation = document.querySelector('.questionaire-total-calculation')
const afterQuestionaire = document.querySelector('.after-questionaire')
const estimatorDisplay = document.createElement('div')
estimatorDisplay.classList.add('estimator-display')
afterQuestionaire.appendChild(estimatorDisplay)
*/

// Clearing Options
const lightC = document.getElementById('lightC')
const moderateC = document.getElementById('moderateC')
const heavyC = document.getElementById('heavyC')


// Acre Options

// Yes is false and No is true, yes its confusing
const acreSubTrue = document.getElementById('acre-sub-true')
const acreSubFalse = document.getElementById('acre-sub-false')
acreSubTrue.addEventListener('click', () => { 
    acreSubTrue.classList.toggle('estimator-choice-selected')
    acreSubFalse.classList.remove('estimator-choice-selected')
    acreInput.value = 1     // If I select acre number as greater than one and then go back to select less than one acre haul stays disabled
    if(sub1Acre){
        sub1Acre = null
    } else{ sub1Acre = true }
})
acreSubFalse.addEventListener('click', () => { 
    acreSubFalse.classList.toggle('estimator-choice-selected')
    acreSubTrue.classList.remove('estimator-choice-selected')
    if(sub1Acre == false){
        sub1Acre = null
    } else { sub1Acre = false }
})

// Disposal Options
const burnD = document.getElementById('burnD')
const mulchD = document.getElementById('mulchD')
const haulD = document.getElementById('haulD')


// Buttons
const clearNext = document.getElementById('clear-btn-next')
const acreBoolBack = document.getElementById('acre-bool-btn-back')
const acreBoolNext = document.getElementById('acre-bool-btn-next')
const acreBack = document.getElementById('acre-btn-back')
const acreNext = document.getElementById('acre-btn-next')
const dispoBack = document.getElementById('dispo-btn-back')
const dispoDone = document.getElementById('dispo-btn-done')
const closeBtns = document.querySelectorAll('.close-x').forEach( btn => { btn.addEventListener('click', () => { hideAll() } )})
//const resetTotal = document.getElementById('total-reset')

// Event Listeners
lightC.addEventListener('click', () => { toggleClearing('light') })
moderateC.addEventListener('click', () => { toggleClearing('moderate') })
heavyC.addEventListener('click', () => { toggleClearing('heavy') })

burnD.addEventListener('click', () => { toggleDisposal('burn');checkComplete() })
mulchD.addEventListener('click', () => { toggleDisposal('mulch');checkComplete() } )
haulD.addEventListener('click', () => { toggleDisposal('haul');checkComplete() } )

clearNext.addEventListener('click', () => { showAcreBool() })
acreBoolBack.addEventListener('click', () => { showClearing() })
acreBoolNext.addEventListener('click', () => { 
    if(sub1Acre){
        checkComplete()
        showDisposal()
    } else { showAcre() }
})
acreBack.addEventListener('click', () => { showAcreBool() })
acreNext.addEventListener('click', () => { checkAcres();checkComplete();showDisposal() })
dispoBack.addEventListener('click', () => { 
    if(sub1Acre){
        showAcreBool()
    } else { showAcre() }
})
dispoDone.addEventListener('click', () => { calculateTotal();hideAll() 
    const estimatorDisplay = document.createElement('div')
    estimatorDisplay.classList.add('estimator-display')
    afterQuestionaire.appendChild(estimatorDisplay)})
//resetTotal.addEventListener('click', () => { total = 0 ; totalCalculation.textContent = total ; estimatorDisplay.remove() })


function toggleClearing(data){
    switch(data){
        case 'light':
            if(clearDensity == 'light'){
                clearDensity = ""
            } else { clearDensity = 'light' }
            lightC.classList.toggle('estimator-choice-selected')
            moderateC.classList.remove('estimator-choice-selected')
            heavyC.classList.remove('estimator-choice-selected')
            break
        case 'moderate':
            if(clearDensity == 'moderate'){
                clearDensity = ""
            } else { clearDensity = 'moderate' }
            lightC.classList.remove('estimator-choice-selected')
            moderateC.classList.toggle('estimator-choice-selected')
            heavyC.classList.remove('estimator-choice-selected')
            break
        case 'heavy':
            if(clearDensity == 'heavy'){
                clearDensity = ""
            } else { clearDensity = 'heavy' }
            lightC.classList.remove('estimator-choice-selected')
            moderateC.classList.remove('estimator-choice-selected')
            heavyC.classList.toggle('estimator-choice-selected')
            break
    }
}

function toggleDisposal(data){
    switch(data){
        case 'burn':
            if(disposalMethod == 'burn'){
                disposalMethod = ""
            } else { disposalMethod = 'burn' }
            burnD.classList.toggle('estimator-choice-selected')
            mulchD.classList.remove('estimator-choice-selected')
            haulD.classList.remove('estimator-choice-selected')
            break
        case 'mulch':
            if(disposalMethod == 'mulch'){
                disposalMethod = ""
            } else { disposalMethod = 'mulch' }
            burnD.classList.remove('estimator-choice-selected')
            mulchD.classList.toggle('estimator-choice-selected')
            haulD.classList.remove('estimator-choice-selected')
            break
        case 'haul':
            if(disposalMethod == 'haul'){
                disposalMethod = ""
            } else { disposalMethod = 'haul' }
            burnD.classList.remove('estimator-choice-selected')
            mulchD.classList.remove('estimator-choice-selected')
            haulD.classList.toggle('estimator-choice-selected')
            break
    }
}

function showClearing(){
    clearDiv.classList.remove('hidden')
    acreBooleanDiv.classList.add('hidden')
    acreDiv.classList.add('hidden')
    dispoDiv.classList.add('hidden')
}

function showAcreBool(){
    clearDiv.classList.add('hidden')
    acreBooleanDiv.classList.remove('hidden')
    acreDiv.classList.add('hidden')
    dispoDiv.classList.add('hidden')
}

function showAcre(){
    acreDiv.classList.remove('hidden')
    acreBooleanDiv.classList.add('hidden')
    clearDiv.classList.add('hidden')
    dispoDiv.classList.add('hidden')
}

function showDisposal(){
    dispoDiv.classList.remove('hidden')
    acreBooleanDiv.classList.add('hidden')
    acreDiv.classList.add('hidden')

    if(allowHaul){
        haulD.disabled = false
        haulD.classList.remove('estimator-choice-disabled')
    } else {
        haulD.disabled = true
        haulD.classList.add('estimator-choice-disabled')
        haulD.classList.remove('estimator-choice-selected')
    }
}

function hideAll(){
    clearDiv.classList.add('hidden')
    acreDiv.classList.add('hidden')
    dispoDiv.classList.add('hidden')

    lightC.classList.remove('questionaire-choice-selected')
    moderateC.classList.remove('questionaire-choice-selected')
    heavyC.classList.remove('questionaire-choice-selected')

    acreSub.classList.remove('questionaire-choice-selected')

    burnD.classList.remove('questionaire-choice-selected')
    mulchD.classList.remove('questionaire-choice-selected')
    haulD.classList.remove('questionaire-choice-selected')

    allowHaul = true
    total = 0
    sub1Acre = null
    acreInput.value = 1
    clearDensity = ""
    disposalMethod = ""
}

function checkAcres(){
    if(sub1Acre || acreInput.value == 0){
        acreNumber = 1
        skidSteerNeeded = false
    } else {
        skidSteerNeeded = true
        acreNumber = acreInput.value
        if(acreInput.value > 1){
            allowHaul = false
        } else {
            allowHaul = true
        }
    }
}

// Haul Off breaks checkComplete sometimes

function checkComplete(){
    if(clearDensity == "" || disposalMethod == ""){
        dispoDone.classList.add('btn-disabled')
        dispoDone.classList.remove('btn-hover')
        dispoDone.disabled = true
    } else {
        dispoDone.classList.remove('btn-disabled')
        dispoDone.classList.add('btn-hover')
        dispoDone.disabled = false
    }
}

function calculateTotal(){

    console.log(`Density: ${clearDensity}`)
    if(skidSteerNeeded){
        console.log(`Acres: ${acreNumber}`)
    } else {
        console.log(`Acres: less than one`)
    }
    console.log(`Method: ${disposalMethod}`)
    
    if(clearDensity == 'heavy'){
        total += 2000 * acreNumber
    } else {
        total += 1500 * acreNumber
    }

    switch(disposalMethod){
        case 'burn':
            total += (150 * acreNumber) + 500
            break
        case 'mulch':
            total += (250 * acreNumber) + 500
            break
        case 'haul':
            total += (100 * acreNumber) + 300
    }

    if(skidSteerNeeded){
        total += 500
    }
    console.log(total)
    totalCalculation.textContent = total

    // Create Display Divs

    // Clearing Options Display Div
    const cDiv = document.createElement('div')
    cDiv.classList.add('display-row')
    const cDensity = document.createElement('span')
    cDensity.classList.add('display-row-service')
    if(acreNumber > 1){
        cDensity.textContent = `${clearDensity} Clearing - ${acreNumber} Acres`
    } else { cDensity.textContent = `${clearDensity} Clearing`}
    const cPrice = document.createElement('span')
    cPrice.classList.add('display-row-cost')
    if(clearDensity == 'heavy'){
        cPrice.textContent = `$${2000 * acreInput.value}`
    } else { cPrice.textContent = `$${1500 * acreInput.value}` }
    cDiv.appendChild(cDensity)
    cDiv.appendChild(cPrice)
    estimatorDisplay.appendChild(cDiv)

    // Disposal Options Display Div
    const dDiv = document.createElement('div')
    dDiv.classList.add('display-row')
    const dDisposal = document.createElement('span')
    dDisposal.classList.add('display-row-service')
    if(acreNumber > 1){
        dDisposal.textContent = `${disposalMethod} Disposal - ${acreNumber} Acres`
    } else{ dDisposal.textContent = `${disposalMethod} Disposal` }
    const dPrice = document.createElement('span')
    dPrice.classList.add('display-row-cost')
    if(disposalMethod == 'burn'){
        dPrice.textContent = `$${150 * acreInput.value}`
    } else if(disposalMethod == 'mulch'){ dPrice.textContent = `$${250 * acreInput.value}` }
    else { dPrice.textContent = `$${100 * acreInput.value}` }
    dDiv.appendChild(dDisposal)
    dDiv.appendChild(dPrice)
    estimatorDisplay.appendChild(dDiv)

    // Equipment Options Display Div
    const eDiv = document.createElement('div')
    eDiv.classList.add('display-row')
    const eDeposit = document.createElement('span')
    eDeposit.classList.add('display-row-service')
    const ePrice = document.createElement('span')
    ePrice.classList.add('display-row-cost')
    var skidSteerAdded
    switch(disposalMethod){
        case 'burn':
            eDeposit.textContent = 'Skid Steer Deposit'
            ePrice.textContent = '$500 + $80/Hourly'
            skidSteerAdded = true
            break
        case 'mulch':
            eDeposit.textContent = 'Chip Shredder Deposit'
            ePrice.textContent = '$500 + $80/Hourly'
            break
        case 'haul':
            eDeposit.textContent = 'Dump Trailer Deposit'
            ePrice.textContent = '$300 + $80/Hourly'
            break
    }
    eDiv.appendChild(eDeposit)
    eDiv.appendChild(ePrice)
    estimatorDisplay.appendChild(eDiv) 
    if(skidSteerNeeded && !skidSteerAdded){
        const eDiv2 = document.createElement('div')
        eDiv2.classList.add('display-row')
        const eDepo2 = document.createElement('span')
        eDepo2.classList.add('display-row-service')
        eDepo2.textContent = 'Skid Steer Deposit'
        const ePrice2 = document.createElement('span')
        ePrice2.classList.add('display-row-cost')
        ePrice2.textContent = '$500 + $80/Hourly'
        eDiv2.appendChild(eDepo2)
        eDiv2.appendChild(ePrice2)
        estimatorDisplay.appendChild(eDiv2) 
    }
    
}