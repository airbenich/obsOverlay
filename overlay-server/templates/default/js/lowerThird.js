class LowerThird {
  constructor(object) {
      this.title = object.title;
      this.subtitle = object.subtitle;
      this.design = object.design;
  }

  setHtml() {
    $('.lowerThird .title').html(this.title);
    $('.lowerThird .subtitle').html(this.subtitle);
  }

  show() {
    this.setHtml();
    this.setPresentationProgressBar(101);
    $('.lowerThird .title').delay(500).fadeIn(1000);
    $('.lowerThird .subtitle').delay(500).fadeIn(1250);
  }

  hide() {
    $('.lowerThird .title').fadeOut(1000);
    $('.lowerThird .subtitle').fadeOut(1000);
    var module_this = this;
    setTimeout(function () {
      module_this.setPresentationProgressBar(0);
    },1000);
  }

    /*
   * set the progress bar
   */
  setPresentationProgressBar(currentValue) {
    // if(currentValue == 0) currentValue = 100;
    $('.progress-bar').css('width', currentValue+'%').attr('aria-valuenow', currentValue);
  }
};