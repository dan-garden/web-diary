registerWidget({
    id: "diary-entry",

    init() {
        document.getElementById(this.id).onsubmit = (e) => {
            e.preventDefault();
            this.submit();
        };
    },

    updateSummary() {
        const summary = this.select("*[populate='summary']").value;
        this.setState({
            summary
        });
    },

    updateActivity(dom) {
        const type = dom.getAttribute('data-type');
        const activity_id = parseInt(dom.parentNode.getAttribute('data-activity-id'));
        const typeValue = dom.value;

        this.state.activities[activity_id][type] = typeValue;
        this.populate();
    },

    addActivity(event) {
        const lastActivity = this.state.activities[this.state.activities.length - 1];
        const newActivity = {
            activity_id: lastActivity ? lastActivity.activity_id + 1 : 0,
            location: "",
            title: "",
            body: ""
        };

        this.state.activities.push(newActivity);
        this.populate();

        document.location = "#activity_" + newActivity.activity_id;

    },

    deleteActivity(activity_id) {
        this.state.activities.splice(activity_id, 1);
        this.state.activities.forEach((activity, index) => {
            activity.activity_id = index;
        });

        this.populate();
    },

    updateTypeID(dom) {
        const selectType = dom.getAttribute('name');
        this.state[selectType].activity_id = parseInt(dom.value);
        this.populate();
    },

    updateTypeReason(dom) {
        const selectType = dom.parentNode.getAttribute('populate');
        this.state[selectType].reason = dom.value;
        this.populate();
    },

    onpop() {
        const selectTypes = ['favorite', 'most_productive', 'least_productive'];
        selectTypes.forEach(selectType => {
            this.select(`[name="${selectType}"]`).value = this.state[selectType].activity_id;
        })
    },

    submit() {
        this.state.date = new Date().toISOString();
        createEntry(this.state, result => console.log(result));
    },

    state: {
        date: "date here",
        summary: "",
        activities: [
        ],
        favorite: {
            activity_id: 0,
            reason: ""
        },
        most_productive: {
            activity_id: 0,
            reason: ""
        },
        least_productive: {
            activity_id: 0,
            reason: ""
        },
        // learnt: [
        //     "I learnt to use the metal brush whilst scrubbing the tray",
        //     "I also learnt a little bit about space-time from Shannon"
        // ]
    },
});