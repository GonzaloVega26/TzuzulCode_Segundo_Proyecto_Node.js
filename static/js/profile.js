console.log("test")
const editButton = document.getElementById('edit-btn')
const generalInformationForm = document.getElementById('general-info')

editButton.addEventListener('click',e=>{
    const inputList= generalInformationForm.querySelectorAll('input')
    editButton.classList.add('is-hidden')

inputList.forEach((input,index)=>{
    input.removeAttribute("disabled")
    generalInformationForm.querySelectorAll('.is-hidden').forEach(item=>{
        item.classList.remove('is-hidden')
    })
})
})

const saveButton = document.getElementById('change-password')
saveButton.addEventListener('click',(e=>{
    const mainInfo = document.getElementById('general-form')
    const passwordInfo = document.getElementById('password-form')
    
    if(mainInfo.classList.contains('is-hidden')){
        mainInfo.classList.remove('is-hidden')
        passwordInfo.classList.add('is-hidden')
    }else{
        
        mainInfo.classList.add('is-hidden')
        passwordInfo.classList.remove('is-hidden')
    }
}))