function Eliminar(id){
    fetch("/eliminar-usuario/"+id,{
        method:"DELETE"
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        return data
    })
}