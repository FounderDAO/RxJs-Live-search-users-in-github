import { EMPTY, fromEvent } from 'rxjs';
import {
        debounceTime, 
        distinctUntilChanged, 
        map, 
        switchMap, 
        mergeMap, 
        tap, 
        catchError,
        filter} from 'rxjs/operators'
import {ajax} from 'rxjs/ajax'

// const url = "https://api.github.com/search/users?q=";
const url = "https://github.com/solana-labs/stake-o-matic/wiki/Validator-"

const search = document.getElementById('search');
const result = document.getElementById('result');
let resultCount = document.getElementById('result_count');


const stream$ = fromEvent(search, 'input')
.pipe(
  map(e => e.target.value),
  debounceTime(1000),
  distinctUntilChanged(),
  tap(() => result.innerHTML = ""),
  filter(v => v.trim()),
  switchMap(v => ajax.getJSON(url + v).pipe(
    catchError(err => EMPTY)
  )),
  map(response => response.items), // array qilib oladi
  // mergeMap(items => items) // xar birini aloxida olish uchun
)


stream$.subscribe(users => {
console.log("users", users)
const count = `<h4 class="center"> Results: ${users.length}.</h4>`;
resultCount.innerHTML = count;
users.map(user => {
  console.log(user)
  // const html =
  //   `
  //   <div class="col s12 m3">
  //     <div class="card">
  //       <div class="card-image">
  //         <img src="${user.avatar_url}">
  //         <span class="card-title">${user.login}</span>
  //           <a class="btn-floating halfway-fab waves-effect waves-light red" 
  //               href="${user.html_url}" target="_blank">
  //           <i class="large material-icons">add</i></a>
  //         </div>
  //         <div class="card-content">
  //           <p>${user.login}</p>
  //         </div>
  //       </div>
  //     </div>`
    result.insertAdjacentHTML('beforeend', html)
})
  
})