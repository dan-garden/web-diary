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



















const entries = [{
    date: "date here",
    summary: "Five Word Summary Goes Here",
    activities: [{
            activtiy_id: 0,
            location: "home",
            title: "dishes",
            body: "At home I did the dishes, I put them away at night just before having dinner and then after dinner I rinsed them, put them into the dishwasher and put them on. I felt good because I also rinsed the big tray that Mum usually does and she thanked me."
        },
        {
            activtiy_id: 1,
            location: "home",
            title: "dishes",
            body: "At home I did the dishes, I put them away at night just before having dinner and then after dinner I rinsed them, put them into the dishwasher and put them on. I felt good because I also rinsed the big tray that Mum usually does and she thanked me."
        },
        {
            activtiy_id: 2,
            location: "home",
            title: "dishes",
            body: "At home I did the dishes, I put them away at night just before having dinner and then after dinner I rinsed them, put them into the dishwasher and put them on. I felt good because I also rinsed the big tray that Mum usually does and she thanked me."
        }
    ],
    favorite: {
        activtiy_id: 0,
        reason: "The reason this was my favorite thing to do was because it made me feel great helping Mum."
    },
    most_productive: {
        activtiy_id: 1,
        reason: "This was the most productive thing because I got alot done etc etc"
    },
    least_productive: {
        activtiy_id: 2,
        improvement: "I can be more productive with this particular task next time by trying to complete it faster, I was really slow at doing it."
    },
    learnt: [
        "I learnt to use the metal brush whilst scrubbing the tray",
        "I also learnt a little bit about space-time from Shannon"
    ]
}];