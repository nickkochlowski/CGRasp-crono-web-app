var rangeSlider = function(){
var slider = $('.range-slider'),
      range = $('.range-slider__range'),
      value = $('.range-slider__value');
    
  slider.each(function(){

    value.each(function(){
      var value = $(this).prev().attr('value');
      document.getElementById("sliderval1").value = this.value;
      document.getElementById("sliderval2").value = this.value;
      document.getElementById("sliderval3").value = this.value;
      document.getElementById("sliderval4").value = this.value;
    });

    range.on('input', function(){
      document.getElementById("sliderval1").value = this.value;
      document.getElementById("sliderval2").value = this.value;
      document.getElementById("sliderval3").value = this.value;
      document.getElementById("sliderval4").value = this.value;
    });
  });
};

rangeSlider();