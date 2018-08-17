// Function that handles navbar related events IIFE
(function() {
  //
  // const upShowPromise = function(){
  //   return new Promise((resolve, reject) => {
  //     resolve(up.style.display = 'block');
  // })
  // };

  navbar.addEventListener('click', () => {
});
  window.addEventListener('scroll', () => {
    // const css = '.nav-menu li:hover {background-color: #ba7c60}';
    if(this.pageYOffset > 325 || this.pageYOffset > 450) {
      // navbar.style.backgroundColor = "#C77F5E";
      up.style.display = 'block';
      setTimeout(function(){
        up.classList.add('show-up');
      },0);
    }
     else {
      // navbar.style.backgroundColor = "#6271AD";
      // navbar.style.transition = 'background-color .5s';
      up.classList.remove('show-up');
      up.style.display = 'none';
    }
});
})();

// IIFE that dictates how the divs that contain both forms, react to the user

(function(tog, rE){


  // Handle the way both login-xs/xl work
  // Movement, animation
  loginBtn.addEventListener('click', function() {
    if(!this.style.right || this.style.right === '0px' || this.style.right === '-20px') {
      this.style.right = '280px';
      loginForm.style.width = '300px';
      document.querySelector('.all-form').style.transform = 'translateX(0px)';
    } else {
      this.style.right = '-20px';
      loginForm.style.width = '0';
      // allForm.style.transform = 'translateX(300px)';
      document.querySelector('.all-form').style.transform = 'translateX(300px)';
    }
  });
  // Change login/register forms
  // Used when user wants to toggle between sign up/ sign in
toggleBtns.forEach( function(btn, idx) {
  btn.addEventListener('click', function() {
    tog(btn, idx, toggleBtns);
    formEl.forEach(input => {
      const regX = /bad/g;
        // Verify if the "bad" class hasn't been removed
        if(input.previousElementSibling.className.match(/bad/g)){
          input.previousElementSibling.classList.remove('bad');
        };
    });

  });
});
})(checkToggled);

(function scrollToTop() {
  console.log('Inside Scroll to top function');
  up.addEventListener('click', function(){
    document.querySelector('.title').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  })
})();

function checkToggled( el, index, toggledArr ) {
    if(index === 1 && toggledArr[0].className === 'active-form') {
      toggledArr[0].classList.remove('active-form');
      el.classList.add('active-form');
      formName.innerHTML = 'Sign Up';
      hiddenInp.classList.remove('hidden-input');
      submitBtn.innerHTML = 'Register';
      document.querySelector('.actual-form').style.height = '300px';
    } else if(index === 0 && toggledArr[1].className === 'active-form') {
      toggledArr[1].classList.remove('active-form');
      el.classList.add('active-form');
      formName.innerHTML = 'Login';
      hiddenInp.classList.add('hidden-input');
      submitBtn.innerHTML = 'Submit';
      document.querySelector('.actual-form').style.height = '200px';
    }
}

(function inputLabel() {
  formEl.forEach(input => {
    input.onfocus = moveInputLabel('focus');
    input.onblur = moveInputLabel('blur');
  })
  // inputLabels.forEach(label => {
  //   label.addEventListener('click', function(ev){
  //     console.log('Click');
  //     console.log(label.className.match(/ph/));
  //     if(this.className.match(/ph/)[0] === 'ph') {
  //       console.log('true');
  //       this.classList.add('onlabel');
  //     }
  //   });
  // })

})();

  function moveInputLabel(type) {

    return function() {
      // Get the div that contains the label for the input
      // document.querySelector('body').addEventListener('click', function())
      const label = this.previousElementSibling.previousElementSibling;
      
      // Array that will contain the values for each border div
      const borderValues1 = ['100%', '32px', '100%', '32px'];
      const borderCls = ['bot', 'right', 'top', 'left'];
      if(type === 'focus') {
        // if(this.value !== 'g') {
          label.classList.add('onlabel');
          // Go through each border div (input siblings)
          // give them a width onfocus
          getNextSiblings(this).forEach( (border, index) => {
            border.classList.remove('animate-' + borderCls[index] + '-shrink');
            // Add animation class for each border
            if(border.style.width) {
              border.style.width = '';
            }
            border.classList.add('animate-' + borderCls[index]);

            // border.style.width = borderValues[index];
          })

          // Enlarge input border
          // this.nextElementSibling.style.width = '100%';

          // this.style.opacity = '1';
          this.classList.add('show-input');

        // }
      } else {
        if(this.value === '') {
          label.classList.remove('onlabel');
          getNextSiblings(this).forEach( (border, index) => {
            // if(border[4].className.match)
            if(!border.style.width) {
              border.style.width = borderValues1[index];
            }
              border.classList.add('animate-' + borderCls[index] + '-shrink');
              // border.style.width = '0';
              border.classList.remove('animate-' + borderCls[index]);
              // setTimeout(function () {
              //   border.classList.remove('animate-' + borderCls[index] + '-shrink');
              // },0);

          })
          // Shrink input border
          // this.nextElementSibling.style.width = '0';
          // this.style.opacity = '0';
          this.classList.remove('show-input');
        }
      }
    }
    getNextSiblings(this).forEach( (border, index) => {
        border.style.width = '0px';

    })
  }

  function countPrevSiblings( htmlEl ){
  	let count = 0,
        currEl;
  	while(htmlEl.previousElementSibling){
      	 currEl = currEl.previousElementSibling;
  		   count++;
  	}
  	return count;
}

// Function that returns all siblings after input node
function getNextSiblings ( htmlEL ){
  // Array that will store every sibling node
    const nSiblings = [];
    // Check if we reach the end of the siblings list
    // As soon as the next element/node is null
    // exit loop
    while(htmlEL.nextElementSibling){
      // Reassign sibling to htmlEL var
      // push it into the array
      htmlEL = htmlEL.nextElementSibling;
	    nSiblings.push(htmlEL);
    }
    // give me back the array
    return nSiblings;
  }
// function showParent(el) {
//   while(el) {
//     const prevEl = el;
//     el = el.offsetParent;
//     console.log(`Element's (${prevEl.tagName}) parent is ${checkParent(el)}\nAnd it's offset is: ${el.offsetTop}`);
//   }
// }
// function checkParent(el) {
//   return el ? el.tagName : null;
// }
