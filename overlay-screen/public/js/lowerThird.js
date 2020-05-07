class LowerThird {
  constructor(object) {
      this.name = object.name;
      this.description = object.description;
      this.design = object.design;
  }

  setHtml() {
    $('.lowerThird .name').html(this.name);
    $('.lowerThird .description').html(this.description);
  }

  show() {
    this.setHtml();
    this.setPresentationProgressBar(101);
    $('.lowerThird .name').delay(500).fadeIn(1000);
    $('.lowerThird .description').delay(500).fadeIn(1250);
  }

  hide() {
    $('.lowerThird .name').fadeOut(1000);
    $('.lowerThird .description').fadeOut(1000);
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