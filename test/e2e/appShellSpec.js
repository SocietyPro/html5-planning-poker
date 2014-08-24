
//var retry = require('webdriverjs-retry');

var Elements = function () {
  //this.applicationContainer = element(by.id('applicationContainer'));
  this.toolTitle = element(by.id('toolTitle'));
};

var elements;
var toolTitle;

var waitForElement = function (elm, txt, attempts) {
  if (attempts == null) {
    attempts = 3;
  };

  return browser.driver.findElement(elm).then(function (found) {
    browser.manage().timeouts().implicitlyWait(300);
    return browser.wait(function () {
      return found.isDisplayed().then(function (visible) {
        if (visible) {
          return found(getText()).then(function (gotText) {
            return gotText === txt;
          });
        } else {
          browser.sleep(300);
          return false;
        };
      }, function (err) {
        if (attempts > 0) {
          return waitForElement(elm, txt, attempts -1 );
        } else {
          throw err;
        };
      });
    }, 5000, 'Expectation error: waiting for element to getText().');
  }, function (err) {
    if (attempts > 0) {
      return waitForElement(elm, txt, attempts -1);
    } else {
      throw err;
    };
  });
};

describe("html5 application shell", function () {

  browser.get('/');
  var POLYMER_READY = false;
  
  beforeEach(function (done) {
    browser.wait(function () {
      POLYMER_READY = browser.executeScript(function () {
        return soProTestsReady == true;
      });
      return POLYMER_READY
    });
  });

/*  it("has an application container", function () {
    var applicationContainer = element(by.id('applicationContainer'));
    expect(applicationContainer.isDisplayed()).toBeTruthy();
  });
*/

  it("has a title bar", function () {
    var toolTitle = element(by.id('toolTitle'));
    if (waitForElement({id: 'toolTitle'}, 'SocietyPro Groups and Governance', 25)) {
      expect(toolTitle.isDisplayed()).toBeTruthy();
      expect(toolTitle.getText()).toEqual('SocietyPro Groups and Governance');
    }
  });

});