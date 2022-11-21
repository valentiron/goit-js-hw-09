import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector("form"),
}


refs.form.addEventListener("submit", getValues);
function getValues(event) {
  event.preventDefault();
  let first = event.target.delay.value;
  let step = event.target.step.value;
  let amount = event.target.amount.value;

  newPromises(Number(first), Number(step), Number(amount));
}

function newPromises(delay, step, amount) {
  let newDelay = delay;
  for (let i = 1; i <= amount; i += 1) {
   createPromise(i, newDelay)
   .then(({position, delay}) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
   })
   .catch(({position, delay}) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
   });
    

   newDelay += step;
  }
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {

  const shouldResolve = Math.random() > 0.3;

  setInterval(() => {
    if (shouldResolve) {
      resolve({position,delay});
    } else {
      reject({position,delay});
    }

  }, delay)

});

}
