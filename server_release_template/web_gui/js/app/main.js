define([
    "jquery",
    "lib/bootstrap.bundle.min",
    "lib/lodash",
    "text!app/templates/main.html",
    "i18n!app/nls/main",
    "app/settings",
    "app/setupWizard",
    "app/monitor",
    "app/driverList",
    "json!../../session",
    "text!../../version",
    "app/monitor",
    "js/lib/lobibox.min.js",
    "css!js/lib/lobibox.min.css"


], function ($, bootstrap, _, mainTemplate, i18n, Settings, SetupWizard, Monitor,driverList, session, version) {
    $(function () {

        var compiledTemplate = _.template(mainTemplate);
        var template = compiledTemplate(i18n);
       
        $("#bodyContent").append(template);       
        $(document).ready(() => {
            $('#loading').remove();          

            var settings = new Settings();
            var wizard = new SetupWizard(settings);
            var monitor = new Monitor(settings);

            $("#bodyContent").show();

            if (session.setupWizard) {
                wizard.showWizard();
            }

            $("#runSetupWizard").click(() => {
                wizard.showWizard();
            })

            $("#addFirewallRules").click(() => {
                $.get("firewall-rules/add", undefined, (res) => {
                    if (res == 0) {
                        Lobibox.notify("success", {
                            size: "mini",
                            rounded: true,
                            delayIndicator: false,
                            sound: false,
                            msg: i18n.firewallSuccess
                        })
                    }
                })
            })

            $("#removeFirewallRules").click(() => {
                $.get("firewall-rules/remove", undefined, (res) => {
                    if (res == 0) {
                        Lobibox.notify("success", {
                            size: "mini",
                            rounded: true,
                            delayIndicator: false,
                            sound: false,
                            msg: i18n.firewallSuccess
                        })
                    }
                })
            })

            $("#version").text("v" + version);

            driverList.fillDriverList("registeredDriversInst");

            
        });
    });
});