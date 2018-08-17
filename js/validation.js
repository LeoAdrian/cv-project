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
        const error = getErrorNode(input, 'error');
        const arrow = getErrorNode(input, 'arrow');
        // console.log('Validation', input.className);
        // Take into consideration only inputs that are not hidden
        if(input.parentNode.className.search(/\shidden-input/) === -1){
          console.log('Input is: ', input);
          // First error
          // If user didn't insert anything, throw error
          if(!input.value) {
            check.push({value: false, cause:'User didn\'t insert any value'});
            // Call function that return an element based on its class
              // Get error and arrow elements and add class bad to them
            error.classList.add('bad');
            arrow.classList.add('bad');


            // Hardcoded method
            // input.previousElementSibling.classList.add('bad');
            input.previousElementSibling.innerHTML = 'User didn\'t insert any value';
            setTimeout( () => {
              error.classList.remove('bad');
              arrow.classList.remove('bad');
              // input.previousElementSibling.classList.remove('bad');
            }, 5000);
            // input.previousSibling.classList.add('bad');
            // const emptyInpText = document.createTextNode('User didn\'t insert any value');
            // errorLabel.appendChild(emptyInpText);
            // errorLabel.classList.add('msg');
            // input.parentNode.insertBefore(errorLabel, input);
            // self.disabled = true;
            // input.appendChild(errorLabel);

            // Second error
            // credentials, throw error
            // If user inserted something that doesn't corespond to the correct
          } else if( input.value && input.value !== credentials[input.name] ){
            check.push({value:false, cause: `${initUp(input.name)} doesn't match`});

            error.classList.add('bad');
            arrow.classList.add('bad');

            // Hardcoded method
            // input.previousElementSibling.classList.add('bad');
            // .classList.add('bad');
            input.previousElementSibling.innerHTML = `${initUp(input.name)} doesn't match`;
            // Remove the errors automatically if they don't disappear
            setTimeout( () => {
              error.classList.remove('bad');
              arrow.classList.remove('bad');
              // input.previousElementSibling.classList.remove('bad');
            }, 5000);
          } else {
            check.push({value:true, cause: `${initUp(input.name)} did match`});
          }
        }
      })
      // Check array contains objects with information regarding the success of the login operation
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

    // Returns the html element that contains the error msg
    function getErrorNode(htmlEL, className) {
      // Use the spread operator on the parent node in order to have an array
      // with all its children
        const nodesArr = [...htmlEL.parentNode.children];
        let errorNode;
        // Count should check for how many times a node has been assigned
        // to errorNode
        let count = 0;
        // Go through each node and check if
        // it's the correct one (i.e. error node)
        nodesArr.forEach(node => {
          if(node.className.search(className) !== -1){
            errorNode = node;
            count++;
          }
        });
        if(count > 1) throw new Error('Only one error div should be available');
        return errorNode;
    };

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

    // Recursive function that will return
    // true if all elements are TRUE
    // false if at least one element is false

    function checkForFalseBitWise(arr) {
      if(arr.length === 1 ){
 		     return arr[0].value;
       };
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
