const post = async (path, data) => {
    const body = JSON.stringify(data);
    const response = await fetch(path, { method: "POST", body, headers: { "Content-Type": "application/json" } });
    return await response.json();
};

const get = async (path) => {
    const response = await fetch(path);
    return await response.json();
}

const getEntries = async () => {
    return await get("/entries");
}


const createEntry = async entryData => {
    return await post("/entries/new", entryData);
}










const createDateDom = (date, delim) => {
    date = new Date(date);
    const dateDom = document.createElement('p');
    dateDom.classList.add('date');
    dateDom.innerHTML = date.getDate() + delim + (date.getMonth()+1) + delim + date.getFullYear();
    return dateDom;
};


const createSummaryDom = summary => {
    const summaryDom = document.createElement('p');
    summaryDom.classList.add('summary');
    summaryDom.innerHTML = summary;
    return summaryDom;
};


const createActivityDom = activity => {
    if(activity) {
        const activityDom = document.createElement('p');
        activityDom.classList.add('activity');
        activityDom.innerHTML = activity.body;
        return activityDom;
    } else {
        return false;
    }
};


const createLeftPage = entry => {
    const page = document.createElement('div');

    const date = createDateDom(entry.date, '/');
    page.append(date);
    
    const summary = createSummaryDom(entry.summary);
    page.append(summary);

    const firstActivity = createActivityDom(entry.activities[0]);
    page.append(firstActivity);

    const secondActivity = createActivityDom(entry.activities[1] || false);
    if(secondActivity) {
        page.append(secondActivity);
    }

    return page;
};

const createRightPage = entry => {
    const page = document.createElement('div');
    
    const date = createDateDom(entry.date, '/');
    page.append(date);

    entry.activities.shift();
    if(entry.activities.length >= 1) {
        entry.activities.shift();
    }

    entry.activities.forEach(activity => {
        activity = createActivityDom(activity);
        page.append(activity);
    });



    return page;
};


const gotoEntry = entryIndex => {
    const pageIndex = (entryIndex * 2) + 4;
    diary.turn("page", pageIndex);
};



const createBlankRightPage = () => {
    return document.createElement('div');
};









// const entries = [{
//     date: "date here",
//     summary: "Five Word Summary Goes Here",
//     activities: [{
//             activtiy_id: 0,
//             location: "home",
//             title: "dishes",
//             body: "At home I did the dishes, I put them away at night just before having dinner and then after dinner I rinsed them, put them into the dishwasher and put them on. I felt good because I also rinsed the big tray that Mum usually does and she thanked me."
//         },
//         {
//             activtiy_id: 1,
//             location: "home",
//             title: "dishes",
//             body: "At home I did the dishes, I put them away at night just before having dinner and then after dinner I rinsed them, put them into the dishwasher and put them on. I felt good because I also rinsed the big tray that Mum usually does and she thanked me."
//         },
//         {
//             activtiy_id: 2,
//             location: "home",
//             title: "dishes",
//             body: "At home I did the dishes, I put them away at night just before having dinner and then after dinner I rinsed them, put them into the dishwasher and put them on. I felt good because I also rinsed the big tray that Mum usually does and she thanked me."
//         }
//     ],
//     favorite: {
//         activtiy_id: 0,
//         reason: "The reason this was my favorite thing to do was because it made me feel great helping Mum."
//     },
//     most_productive: {
//         activtiy_id: 1,
//         reason: "This was the most productive thing because I got alot done etc etc"
//     },
//     least_productive: {
//         activtiy_id: 2,
//         improvement: "I can be more productive with this particular task next time by trying to complete it faster, I was really slow at doing it."
//     },
//     learnt: [
//         "I learnt to use the metal brush whilst scrubbing the tray",
//         "I also learnt a little bit about space-time from Shannon"
//     ]
// }];