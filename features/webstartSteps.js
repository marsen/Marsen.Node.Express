module.exports = function() {
    // 1. 根據 Feature 撰寫 Step 的語法

    this.Given(/^: 瀏覽about頁時$/, function(callback) {
        // Write code here that turns the phrase above into concrete actions
        this.url("http://localhost:3000/about")
            .waitForElementVisible('body', 1000);
    });

    this.Given(/^: 畫面出現about頁$/, function(callback) {
        // Write code here that turns the phrase above into concrete actions
        this.assert.title("About");
    });
}
