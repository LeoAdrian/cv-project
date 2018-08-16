(function validate() {
    const credentials = {
      username: 'Leo',
      password: 'pass'
    }
    const submitPromise = function (e, btn){
      return new Promise((resolve, reject) => {
      resolve(submitCb(e, btn));
    })
  }

    console.log('Hello from validate');
    // Remove the submit event from the form
    submit.addEventListener('click', function(ev) {
      // ev.preventDefault();
      // const check = [];
      // formEl.forEach( (input, index) => {
      //   if(input.className !== 'hidden-input'){
      //     !input.value ? check.push(false)
      //                  : check.push(true);
      //
      //   }
      // })
      // Call and log the function to clear the used inputs
      // console.log(clearVal(formEl));
      submitPromise(ev, this)
      .then(() => {
        clearVal(formEl);
      })
    });


    function submitCb(e, self) {
      e.preventDefault();
      const check = [];
      // const keys  = Object.keys(credentials);
      // const values = Object.values(credentials);
      formEl.forEach( (input, index) => {
        const errorLabel = document.createElement('P');
        if(input.className !== 'hidden-input'){
          if(!input.value) {
            check.push({value: false, cause:'User didn\'t insert any value'});
            input.previousElementSibling.classList.add('bad');
            input.previousElementSibling.innerHTML = 'User didn\'t insert any value';
            setTimeout( () => {
              console.log(input.previousElementSibling);
              input.previousElementSibling.classList.remove('bad');
            }, 10000);
            // input.previousSibling.classList.add('bad');
            // const emptyInpText = document.createTextNode('User didn\'t insert any value');
            // errorLabel.appendChild(emptyInpText);
            // errorLabel.classList.add('msg');
            // input.parentNode.insertBefore(errorLabel, input);
            // self.disabled = true;
            // input.appendChild(errorLabel);
          } else if( input.value && input.value !== credentials[input.name] ){
            check.push({value:false, cause: `${initUp(input.name)} doesn't match`});
            input.previousElementSibling.classList.add('bad');
            input.previousElementSibling.innerHTML = `${initUp(input.name)} doesn't match`;
            setTimeout( () => {
              input.previousElementSibling.classList.remove('bad');
            }, 10000);
          } else {
            check.push({value:true, cause: `${initUp(input.name)} did match`});
          }
        }
      })
      check.forEach(obj => {
        obj.cause ? console.log(obj.cause) : console.log('Value was TRUE');
        // if(obj.cause && obj.)
      })
      console.log(check);
      if(checkForFalseBitWise(check)) {
        alert('Successful login');
      }
    // }
    removeErr();
    }

    function removeErr() {
      formEl.forEach(input => {
        const regX = /bad/g;
        input.addEventListener('keydown', function(){
          // Verify if the "bad" class hasn't been removed
          if(input.previousElementSibling.className.match(/bad/g)){
            input.previousElementSibling.classList.remove('bad');
          };
        });
      });
      };

    function checkForFalseBitWise(arr) {
      if(arr.length === 1 ){
 		     return arr[0].value;
	      }
	    return arr[0].value & checkForFalseBitWise(arr.slice(1));
    };

    function clearVal(inputArr) {
      let nrOfInputs = 0;
      const usedInputs = [];

      // Iterate over all inputs in the form
      inputArr.forEach (input => {
        // If input was used by the user, push it into a new array
        if(input.value){
          usedInputs.push(input);
        }
      })
      // Iterate over all used inputs
      usedInputs.forEach( input => {
        // Increment the variable in order to know how many inputs were
        // modified
        nrOfInputs++;
        input.value = '';
      })
      return `Cleared input for ${nrOfInputs} elements`;
    };

    function initUp(str) {
      return str.slice(0,1).toUpperCase() + str.slice(1);
    };
})()
