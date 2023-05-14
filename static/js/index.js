window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/print";
var NUM_INTERP_FRAMES = 60;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + 'output'+String(i) + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}

var Editing_Base = "./static/editing"
var NUM_Editing_FRAMES = 4;
var Editing_images1 = [];
function preloadEditingImages1() {
  for (var i = 0; i < NUM_Editing_FRAMES; i++) {
    var path = Editing_Base + '/'  +String(i)+'editing' + '.png';
    Editing_images1[i] = new Image();
    Editing_images1[i].src = path;
  }
}

function setEditingImage1(i) {
  var image_Editing = Editing_images1[i];
  image_Editing.ondragstart = function() { return false; };
  image_Editing.oncontextmenu = function() { return false; };
  $('#Editing-image1-wrapper').empty().append(image_Editing);
}



var GT_Base = "./static/interpolation/GT_image"
var GT_images = [];
function preloadGTImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = GT_Base + '/' + 'remap_vis_sem_instance_'+ String(i) + '.png';
    GT_images[i] = new Image();
    GT_images[i].src = path;
  }
}

function setGTImage(i) {
  var image_GT = GT_images[i];
  image_GT.ondragstart = function() { return false; };
  image_GT.oncontextmenu = function() { return false; };
  $('#GT-image-wrapper').empty().append(image_GT);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();
    preloadGTImages();
    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
      setGTImage(this.value);
    });
    setInterpolationImage(0);
    setGTImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);
    
    bulmaSlider.attach();

    preloadEditingImages1();
    // preloadEditingImages2();
    $('#Editing-slider').on('input', function(event) {
      var count = this.value / 19.5
      setEditingImage1(count);
      // setEditingImage2(count)
    });
    setEditingImage1(0);
    // setEditingImage2(0);
    $('#Editing-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

    const changeImageBtn1 = document.querySelector("#change-image-btn1");
    const changeImageBtn2 = document.querySelector("#change-image-btn2");
    // 为按钮元素添加点击事件监听器
    changeImageBtn1.addEventListener("click", function() {
      // 更换输出的图片
      const outputImg1 = document.querySelector("#output-img1");
      outputImg1.src = "./static/editing/erasing.png";
    });

    changeImageBtn2.addEventListener("click", function() {
      // 更换输出的图片
      const outputImg2 = document.querySelector("#output-img2");
      outputImg2.src = "./static/editing/erasing_room0.png";
    });
    // const changeImageBtn = document.querySelector("#change-image-btn");

    // //  为按钮元素添加点击事件监听器
    // changeImageBtn.addEventListener("click", function() {
    // // 更换输出的图片
    // const outputImg = document.querySelector("#Editing-image-wrapper");
    
    // outputImg.src = "./static/images/interpolate_end.jpg";
    // console.log(outputImg);
    // }
});

