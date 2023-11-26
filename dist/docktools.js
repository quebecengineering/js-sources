function unDockIfEdit() {
    if (ctx.isEdit && self.isDocked) {
        self.isDocked = false;
    }
}

function getParentElement(count) {
    let p = self.ctx.$container[0];

    for (let c = 0; c < count; c++)
        p = p.parentElement;

    return p;
}

function checkWidgetVisibility() {
    if (self.widgetIsVisible == undefined)
        self.widgetIsVisibel = true;

    if (!ctx.settings.autoHideOnNoData && self
        .widgetIsVisible) {
        return;
    }

    self.widgetIsVisible = (ctx.data[0].data.length > 0) ||
        ctx.isEdit;
    if (self.widget) {
        self.widget.style.display = self.widgetIsVisible ?
            "" : "none";
    }
}

function initWidgetDocker() {
    let title = document.getElementsByTagName("title")[
        0].textContent;
    self.isOnDashboard = title.includes("Dashboard");
    self.isDocked = false;

    self.widget = getParentElement(6);
    self.className = getParentElement(3).classList.value;

    if (!self.isOnDashboard)
        return;

    if (ctx.isEdit)
        return;

    if ((ctx.settings.enableWidgetDocking && ctx.settings
            .widgetDockId !== undefined) !== true)
        return;

    //Register class 
    if (!top.dockClients)
        top.dockClients = [];

    if (top.dockClients.indexOf(self.className) === -1)
        top.dockClients.push(self.className);

    let host = document.getElementById(ctx.settings
        .widgetDockId);

    if (host !== null) {
        host.appendChild(self.widget);
        try {
            let style = JSON.parse(ctx.settings
                .widgetStyleScheme);

            for (let s in style)
                self.widget.style[s] = style[s];
        } catch (e) {}

        self.isDocked = true;
    }
}