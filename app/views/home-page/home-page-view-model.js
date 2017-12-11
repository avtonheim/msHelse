var Observable = require("data/observable").Observable;
var LocalNotifications = require("nativescript-local-notifications");
var dialogs = require("ui/dialogs");

function doAddOnMessageReceivedCallback() {
    LocalNotifications.addOnMessageReceivedCallback(
        function(notificationData) {
            dialogs.alert({
                title: "Korleis har du det?",
                message: notificationData.body,
                okButtonText: "OK"
            });
        }
    );
}

function createViewModel() {
    var viewModel = new Observable();

    viewModel.id = 0;
    viewModel.title = "Test Title";
    viewModel.body = "Test Body";
    viewModel.ticker = "Test Ticker";

    doAddOnMessageReceivedCallback();

    viewModel.schedule = function() {
        LocalNotifications.schedule([{
            //id: this.id,
            body: "Fyll ut dagboka di for å få ein oversikt over symptom, dagsform og planlegging.",
            interval: 'day',
            at: new Date(new Date().getTime() + (10 * 1000))
        }]).then(() => {
            console.log("Notification scheduled");
        }, (error) => {
            console.log("ERROR", error);
        });
    }

    //viewModel.schedule();

    return viewModel;
}

exports.createViewModel = createViewModel;
