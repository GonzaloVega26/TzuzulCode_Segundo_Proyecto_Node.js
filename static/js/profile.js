console.log("test")
const editButton = document.getElementById('edit-btn')
const inputList = document.querySelectorAll('input')
console.log(inputList)
editButton.addEventListener('click',e=>{
inputList.forEach((input,index)=>{
    input.removeAttribute("disabled")
    document.querySelectorAll('.is-hidden').forEach(item=>{
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