BASE_URL="http://localhost:3000/transactions";

const showBtn = document.querySelector(".show-transactions__btn");
const transActions=document.querySelector(".transactions");
const firstPage= document.querySelector(".show-transactions")
const searchInput = document.querySelector(".transactions__search-input");
const transactionDom = document.querySelector("#transaction-item");
const icons= document.querySelectorAll(".fa-chevron-down");


showBtn.addEventListener("click",(e)=>getData(e))

let allTransactions=[]
const filters={
    searchItem:"",
    sort:"",
    sortOrder:"",
};


function getData(e){
    axios.get(BASE_URL)
    .then(res=>{allTransactions=res.data
     //render transactions on DOM
     renderTransactions(res.data);
    }).catch();
    transActions.classList.remove("hidden");
    firstPage.classList.add("hidden");
}


function renderTransactions(_transactions){

 let result=``;

_transactions.forEach(element => {
    result+=`<tr class="transaction__items">
<td>${element.id}</td>
<td class="${
    element.type === "برداشت از حساب" ? "transaction__item-validity not" 
    : "transaction__item-validity"}">${element.type}</td>
<td class="transaction__item-price">${element.price}</td>
<td>${element.refId}</td>
<td>${new Date(element.date).toLocaleDateString("fa-IR")}</td>
</tr>`
});
transactionDom.innerHTML=result;
}



icons.forEach((icon)=>{
    icon.addEventListener("click",(e)=>{
        console.log(icon.classList)
        icon.classList.toggle("rotate"); 
        console.log(icon.classList)
        filters.sort=e.target.dataset.type;
        filters.sortOrder= e.target.classList.contains("rotate") ? "desc" :"asc";
        console.log(filters);        
        axios.get(`${BASE_URL}?_sort=${e.target.dataset.type}&_order=${filters.sortOrder}`)
        .then(res=>{ allTransactions=res.data
            renderTransactions(res.data)})
        .catch(err=>console.log("errore"))
           
        });   

});




      
        
          
        


searchInput.addEventListener("input",(e)=>{
    console.log(e.target.value);
    filters.searchItem=e.target.value;
    axios.get(`${BASE_URL}?refId_like=${e.target.value}`)
    .then(res=>{allTransactions=res.data
        renderTransactions(res.data)
    })
    .catch(err=>console.log(err.message))
   
})
