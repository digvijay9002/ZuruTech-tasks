let valueDisplays = document.querySelectorAll(".num");
let interval = 5000;
let flag = true;

// window.onscroll = function () {
//   myFunction();
// };

function myFunction() {
  //   if (document.documentElement.scrollTop > 4500) {
  if (flag) {
    flag = false;
    valueDisplays.forEach((valueDisplay) => {
      let startValue = 0;
      let endValue = parseInt(valueDisplay.getAttribute("data-val"));

      let duration = Math.floor(interval / endValue);

      let counter = setInterval(function () {
        startValue += 1;
        valueDisplay.textContent = startValue;

        if (startValue == endValue) {
          clearInterval(counter);
        }
      }, duration);
    });
  }
  //   }
}
